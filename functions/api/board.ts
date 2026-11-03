import { AGE_BANDS, ALL, authenticate, fail, isExId, isMember, json, parseCounts, readableWeek, DAY_CAP, type Handler, type Player } from '../../server/board';

/**
 * GET /api/board?metric=days|improvement|best&ex=<id>&band=<age band>&pace=relaxed&group=<id>&week=YYYY-Www
 * Returns the top 3, the total and, for a signed-in player, their rank with the 5 players just above and below:
 * people see a race they can win, not a list of 100 names.
 * days (consistency): points for training days and activities (see consistencyPoints), overall only.
 * improvement: change of level, overall or per exercise. best: best level this week on one exercise;
 * relaxed-pace players are ranked apart. group: only that group's members (the caller must be one of them).
 *
 * `rank` is shared by equal values (two players with 40 points are both #3), as in sport, and whoever sent
 * results first shouldn't look ahead. `pos` is the place in the list: ties are broken by who reached the value
 * first (each value has its own time, which changes only when the value does).
 */
const METRICS = {
  days: { col: 'points', at: 'points_at' },
  improvement: { col: 'improvement', at: 'improvement_at' },
  best: { col: 'best', at: 'best_at' },
} as const;
const TOP = 3;
const NEAR = 5;
const CACHE_SECONDS = 60;

interface Row {
  player_id: string;
  name_code: number;
  age_band: string | null;
  value: number;
  reached: number;
  days: number;
  day_counts: string;
}

const round1 = (v: number) => Math.round(v * 10) / 10;

export const onRequestGet: Handler = async ({ request, env, waitUntil }) => {
  const url = new URL(request.url);
  const q = url.searchParams;
  const metric = q.get('metric') ?? 'days';
  if (!(metric in METRICS)) return fail(400, 'bad_metric');
  const { col, at } = METRICS[metric as keyof typeof METRICS];
  const ex = q.get('ex') ?? ALL;
  if (!isExId(ex) || (metric === 'days' && ex !== ALL) || (metric === 'best' && ex === ALL)) return fail(400, 'bad_ex');
  const band = q.get('band');
  if (band !== null && !AGE_BANDS.includes(band)) return fail(400, 'bad_age_band');
  const week = readableWeek(q.get('week'));
  if (!week) return fail(400, 'bad_week');
  const group = q.get('group');
  if (group !== null && !/^[0-9a-f-]{36}$/.test(group)) return fail(400, 'bad_group');

  let player: Player | null = null;
  if (request.headers.has('Authorization')) {
    player = await authenticate(request, env);
    if (!player) return fail(401, 'unauthorized');
  }
  const db = env.DB;
  if (group && !(player && (await isMember(db, group, player.id)))) return fail(403, 'not_member');

  // The public part is the same for everyone: serve it from the edge cache.
  const cache = caches.default;
  const cacheKey = new Request(url.toString(), { method: 'GET' });
  if (!player) {
    const hit = await cache.match(cacheKey);
    if (hit) return hit;
  }

  const filters = ['e.week = ?', 'e.ex = ?'];
  const args: (string | number)[] = [week, ex];
  if (band) {
    filters.push('p.age_band = ?');
    args.push(band);
  }
  if (metric === 'best') {
    filters.push('e.relaxed = ?');
    args.push(q.get('pace') === 'relaxed' ? 1 : 0);
  }
  if (group) {
    filters.push('e.player_id IN (SELECT player_id FROM group_members WHERE group_id = ?)');
    args.push(group);
  }
  const from = `FROM entries e JOIN players p ON p.id = e.player_id WHERE ${filters.join(' AND ')}`;
  const select = `SELECT e.player_id, p.name_code, p.age_band, e.${col} AS value, e.${at} AS reached, e.days, e.day_counts ${from}`;
  const count = (where: string, ...more: number[]) => db.prepare(`SELECT COUNT(*) AS n ${from} AND ${where}`).bind(...args, ...more);
  const n = (r: D1Result) => (r.results[0] as { n: number }).n;

  const [total, top] = await db.batch([
    db.prepare(`SELECT COUNT(*) AS n ${from}`).bind(...args),
    db.prepare(`${select} ORDER BY e.${col} DESC, e.${at} ASC LIMIT ${TOP}`).bind(...args),
  ]);
  const topRows = top.results as unknown as Row[];
  const placed: { row: Row; pos: number }[] = topRows.map((row, i) => ({ row, pos: i + 1 }));
  let me: { row: Row; pos: number } | null = null;
  let above: { row: Row; pos: number }[] = [];
  let below: { row: Row; pos: number }[] = [];

  if (player) {
    const mine = await db.prepare(`${select} AND e.player_id = ?`).bind(...args, player.id).first<Row>();
    if (mine) {
      // Ahead in the list = higher value, or the same value reached earlier.
      const ahead = `(e.${col} > ? OR (e.${col} = ? AND e.${at} < ?))`;
      const behind = `(e.${col} < ? OR (e.${col} = ? AND e.${at} > ?))`;
      const key = [mine.value, mine.value, mine.reached];
      const [aheadCount, up, down] = await db.batch([
        count(ahead, ...key),
        db.prepare(`${select} AND ${ahead} ORDER BY e.${col} ASC, e.${at} DESC LIMIT ${NEAR}`).bind(...args, ...key),
        db.prepare(`${select} AND ${behind} ORDER BY e.${col} DESC, e.${at} ASC LIMIT ${NEAR}`).bind(...args, ...key),
      ]);
      const pos = n(aheadCount) + 1;
      me = { row: mine, pos };
      above = (up.results as unknown as Row[]).map((row, i) => ({ row, pos: pos - 1 - i })).reverse();
      below = (down.results as unknown as Row[]).map((row, i) => ({ row, pos: pos + 1 + i }));
      placed.push(me, ...above, ...below);
    }
  }

  // Shared rank: 1 + the players with a strictly higher value (one count per distinct value shown).
  const values = [...new Set(placed.map((p) => p.row.value))];
  const counts = values.length ? await db.batch(values.map((v) => count(`e.${col} > ?`, v))) : [];
  const rankOf = new Map(values.map((v, i) => [v, n(counts[i]) + 1]));
  const out = ({ row, pos }: { row: Row; pos: number }) => ({
    rank: rankOf.get(row.value)!,
    pos,
    nameCode: row.name_code,
    ageBand: row.age_band,
    value: round1(row.value),
    // Consistency also shows what the points are made of: training days and activities (those that earn points).
    ...(metric === 'days' ? { days: row.days, activities: parseCounts(row.day_counts).reduce((a, c) => a + Math.min(c, DAY_CAP), 0) } : {}),
    ...(row.player_id === player?.id ? { me: true } : {}),
  });

  const result = {
    week,
    total: n(total),
    top: placed.slice(0, topRows.length).map(out),
    me: me && out(me),
    above: above.map(out),
    below: below.map(out),
  };
  if (player) return json(result);
  const res = json(result, 200, { 'Cache-Control': `public, max-age=${CACHE_SECONDS}` });
  waitUntil(cache.put(cacheKey, res.clone()));
  return res;
};
