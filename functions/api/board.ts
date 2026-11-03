import { AGE_BANDS, ALL, authenticate, fail, isExId, json, readableWeek, type Handler, type Player } from '../../server/board';

/**
 * GET /api/board?metric=days|improvement|best&ex=<id>&band=<age band>&pace=relaxed&week=YYYY-Www
 * Returns the top 3, the total and, for a signed-in player, their rank with the 5 players just above and below:
 * people see a race they can win, not a list of 100 names.
 * days: training days this week (overall only). improvement: change of level, overall or per exercise.
 * best: best level this week on one exercise; relaxed-pace players are ranked apart.
 *
 * `rank` is shared by equal values (two players with 4 days are both #3), as in sport: with only 0–7 training
 * days ties are the rule, and whoever sent results first shouldn't look ahead. `pos` is the place in the
 * list (ties broken by who got there first), used to lay the rows out.
 */
const METRICS = { days: 'days', improvement: 'improvement', best: 'best' } as const;
const TOP = 3;
const NEAR = 5;
const CACHE_SECONDS = 60;

interface Row {
  player_id: string;
  name_code: number;
  age_band: string | null;
  value: number;
  updated: number;
}

const round1 = (v: number) => Math.round(v * 10) / 10;

export const onRequestGet: Handler = async ({ request, env, waitUntil }) => {
  const url = new URL(request.url);
  const q = url.searchParams;
  const metric = q.get('metric') ?? 'days';
  if (!(metric in METRICS)) return fail(400, 'bad_metric');
  const col = METRICS[metric as keyof typeof METRICS];
  const ex = q.get('ex') ?? ALL;
  if (!isExId(ex) || (metric === 'days' && ex !== ALL) || (metric === 'best' && ex === ALL)) return fail(400, 'bad_ex');
  const band = q.get('band');
  if (band !== null && !AGE_BANDS.includes(band)) return fail(400, 'bad_age_band');
  const week = readableWeek(q.get('week'));
  if (!week) return fail(400, 'bad_week');

  let player: Player | null = null;
  if (request.headers.has('Authorization')) {
    player = await authenticate(request, env);
    if (!player) return fail(401, 'unauthorized');
  }
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
  const from = `FROM entries e JOIN players p ON p.id = e.player_id WHERE ${filters.join(' AND ')}`;
  const select = `SELECT e.player_id, p.name_code, p.age_band, e.${col} AS value, e.updated ${from}`;
  const db = env.DB;
  const count = (where: string, ...more: number[]) => db.prepare(`SELECT COUNT(*) AS n ${from} AND ${where}`).bind(...args, ...more);
  const n = (r: D1Result) => (r.results[0] as { n: number }).n;

  const [total, top] = await db.batch([
    db.prepare(`SELECT COUNT(*) AS n ${from}`).bind(...args),
    db.prepare(`${select} ORDER BY e.${col} DESC, e.updated ASC LIMIT ${TOP}`).bind(...args),
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
      const ahead = `(e.${col} > ? OR (e.${col} = ? AND e.updated < ?))`;
      const behind = `(e.${col} < ? OR (e.${col} = ? AND e.updated > ?))`;
      const key = [mine.value, mine.value, mine.updated];
      const [aheadCount, up, down] = await db.batch([
        count(ahead, ...key),
        db.prepare(`${select} AND ${ahead} ORDER BY e.${col} ASC, e.updated DESC LIMIT ${NEAR}`).bind(...args, ...key),
        db.prepare(`${select} AND ${behind} ORDER BY e.${col} DESC, e.updated ASC LIMIT ${NEAR}`).bind(...args, ...key),
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
