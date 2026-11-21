import { fail, localDay, networkHash, readBody, type Handler } from '../../server/board';

/**
 * POST /api/ping { date: "YYYY-MM-DD" } — "someone trained this week", for the anonymous weekly total.
 * The app sends it once a week, at the first activity, unless the player turned it off. Nothing identifies the
 * sender: the network is stored only as a hash keyed with the week (it can't be traced back, nor linked across
 * weeks), and only to limit how much one network can add.
 *
 * Two limits per network tell a real place apart from someone sending the request in a loop by how the signals
 * arrive, not by who sends them. A care home, a hospital's guest Wi-Fi or a mobile carrier's shared address
 * produce signals spread over the week, so WEEK_CAP leaves them room; a loop produces a burst, which HOUR_CAP
 * stops (inflating the total by WEEK_CAP would take WEEK_CAP / HOUR_CAP hours of sending).
 *
 * Networks that hit the weekly cap, to see whether it is too low (wrangler d1 execute synapse-board --remote):
 *   SELECT week, COUNT(*) AS capped FROM community_pings WHERE n >= 150 GROUP BY week;
 */
const WEEK_CAP = 150;
const HOUR_CAP = 15;
const HOUR = 3_600_000;

export const onRequestPost: Handler = async ({ request, env }) => {
  const body = await readBody(request, 256);
  const day = localDay(body?.date);
  if (!day) return fail(400, 'bad_date');
  const net = (await networkHash(request, `community|${env.TURNSTILE_SECRET ?? ''}|${day.week}`)) ?? 'unknown';
  const hour = Math.floor(Date.now() / HOUR) * HOUR;
  await env.DB.prepare(
    `INSERT INTO community_pings (week, net, n, hour_start, hour_n) VALUES (?1, ?2, 1, ?3, 1)
     ON CONFLICT (week, net) DO UPDATE SET
       n = n + 1,
       hour_n = CASE WHEN hour_start = excluded.hour_start THEN hour_n + 1 ELSE 1 END,
       hour_start = excluded.hour_start
     WHERE n < ?4 AND (hour_start <> excluded.hour_start OR hour_n < ?5)`,
  )
    .bind(day.week, net, hour, WEEK_CAP, HOUR_CAP)
    .run();
  return new Response(null, { status: 204 });
};
