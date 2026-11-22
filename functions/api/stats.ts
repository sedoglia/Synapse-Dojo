import { ALL, DAY_CAP, fail, isoWeek, json, localDay, parseCounts, shiftDay, type Handler } from '../../server/board';

/**
 * GET /api/stats?date=YYYY-MM-DD (the player's local date)
 * How many people trained in the 7 days ending on that date, for the home screen: others are training too (social
 * proof). A rolling window, so the number never drops to zero on Mondays.
 * `people` comes from the anonymous signals (see ping.ts); since players can turn those off, it is never less than
 * the leaderboard players who trained in the window. `players` and `activities` are the leaderboard's own totals,
 * activities counted up to DAY_CAP a day as consistency points are. Totals only, never a player, so the answer
 * is the same for everyone and comes from the edge cache.
 */
const CACHE_SECONDS = 300;

interface Entry {
  player_id: string;
  week: string;
  day_counts: string;
}

export const onRequestGet: Handler = async ({ request, env, waitUntil }) => {
  const url = new URL(request.url);
  const date = url.searchParams.get('date');
  const today = localDay(date);
  if (!today || !date) return fail(400, 'bad_date');

  const cache = caches.default;
  const cacheKey = new Request(url.toString(), { method: 'GET' });
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  // The window is this ISO week up to today plus the end of the previous week (the days after today's weekday).
  const from = shiftDay(date, -6);
  const lastWeek = isoWeek(new Date(`${shiftDay(date, -7)}T00:00:00Z`));
  const db = env.DB;
  const [pings, board] = await db.batch([
    db.prepare('SELECT COALESCE(SUM(n), 0) AS people FROM community_days WHERE day BETWEEN ? AND ?').bind(from, date),
    db
      .prepare('SELECT player_id, week, day_counts FROM entries WHERE ex = ? AND days > 0 AND week IN (?, ?)')
      .bind(ALL, today.week, lastWeek),
  ]);

  // A player active on both sides of the week boundary has two rows: count them once.
  const active = new Set<string>();
  let activities = 0;
  for (const row of board.results as unknown as Entry[]) {
    const counts = parseCounts(row.day_counts);
    const days = row.week === today.week ? counts.slice(0, today.day + 1) : counts.slice(today.day + 1);
    const done = days.reduce((sum, c) => sum + Math.min(c, DAY_CAP), 0);
    if (done > 0) active.add(row.player_id);
    activities += done;
  }

  const players = active.size;
  const people = Math.max((pings.results[0] as { people: number }).people, players);
  const res = json({ date, people, players, activities }, 200, { 'Cache-Control': `public, max-age=${CACHE_SECONDS}` });
  waitUntil(cache.put(cacheKey, res.clone()));
  return res;
};
