import { ALL, DAY_CAP, fail, json, readableWeek, shiftWeek, type Handler } from '../../server/board';

/**
 * GET /api/stats?week=YYYY-Www
 * How many people trained in a week and the one before, for the home screen: others are training too (social proof).
 * `people` comes from the anonymous weekly signals (see ping.ts); since players can turn those off, it is never
 * less than the leaderboard players who trained. `players` and `activities` are the leaderboard's own totals,
 * activities counted up to DAY_CAP a day as consistency points are. Totals only, never a player, so the answer
 * is the same for everyone and comes from the edge cache.
 */
const CACHE_SECONDS = 300;

interface Totals {
  people: number;
  players: number;
  activities: number;
}

const DAYS = [0, 1, 2, 3, 4, 5, 6].map((i) => `min(coalesce(json_extract(day_counts, '$[${i}]'), 0), ${DAY_CAP})`).join(' + ');

export const onRequestGet: Handler = async ({ request, env, waitUntil }) => {
  const url = new URL(request.url);
  const week = readableWeek(url.searchParams.get('week'));
  if (!week) return fail(400, 'bad_week');

  const cache = caches.default;
  const cacheKey = new Request(url.toString(), { method: 'GET' });
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const previous = shiftWeek(week, -1);
  const db = env.DB;
  const [board, pings] = await db.batch<{ week: string; players?: number; activities?: number; people?: number }>([
    db
      .prepare(
        `SELECT week, COUNT(*) AS players, COALESCE(SUM(${DAYS}), 0) AS activities
         FROM entries WHERE ex = ? AND days > 0 AND week IN (?, ?) GROUP BY week`,
      )
      .bind(ALL, week, previous),
    db.prepare('SELECT week, SUM(n) AS people FROM community_pings WHERE week IN (?, ?) GROUP BY week').bind(week, previous),
  ]);
  const of = (w: string): Totals => {
    const b = board.results.find((r) => r.week === w);
    const p = pings.results.find((r) => r.week === w);
    const players = b?.players ?? 0;
    return { people: Math.max(p?.people ?? 0, players), players, activities: b?.activities ?? 0 };
  };

  const res = json({ week, current: of(week), previous: of(previous) }, 200, { 'Cache-Control': `public, max-age=${CACHE_SECONDS}` });
  waitUntil(cache.put(cacheKey, res.clone()));
  return res;
};
