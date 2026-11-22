import { fail, localDay, networkHash, readBody, type Handler } from '../../server/board';

/**
 * POST /api/ping { date: "YYYY-MM-DD" } — "someone trained", for the anonymous total of the last 7 days.
 * The app sends it at an activity, at most once every 7 days, unless the player turned it off; the server counts
 * the signals per day and /api/stats sums the last 7. Nothing identifies the sender: the network is stored only as
 * a hash keyed with the day (it can't be traced back, nor linked across days), and only to limit how much one
 * network can add.
 *
 * Two limits per network tell a real place apart from someone sending the request in a loop by how the signals
 * arrive, not by who sends them. A care home, a hospital's guest Wi-Fi or a mobile carrier's shared address send
 * signals spread over the days; a loop sends a burst. The limits leave room for a group session, a ward or a room
 * where up to HOUR_LIMIT people start together: since each device signals again 7 days later, such a group keeps
 * arriving on the same weekday. One network can add at most 7 × DAY_LIMIT to the 7-day total.
 *
 * Networks that hit the daily limit, to see whether it is too low (wrangler d1 execute synapse-board --remote):
 *   SELECT day, COUNT(*) AS capped FROM community_days WHERE n >= 60 GROUP BY day;
 */
const DAY_LIMIT = 60;
const HOUR_LIMIT = 30;
const HOUR = 3_600_000;

export const onRequestPost: Handler = async ({ request, env }) => {
  const body = await readBody(request, 256);
  if (!localDay(body?.date)) return fail(400, 'bad_date');
  const date = body!.date as string;
  const net = (await networkHash(request, `community|${env.TURNSTILE_SECRET ?? ''}|${date}`)) ?? 'unknown';
  const hour = Math.floor(Date.now() / HOUR) * HOUR;
  await env.DB.prepare(
    `INSERT INTO community_days (day, net, n, hour_start, hour_n) VALUES (?1, ?2, 1, ?3, 1)
     ON CONFLICT (day, net) DO UPDATE SET
       n = n + 1,
       hour_n = CASE WHEN hour_start = excluded.hour_start THEN hour_n + 1 ELSE 1 END,
       hour_start = excluded.hour_start
     WHERE n < ?4 AND (hour_start <> excluded.hour_start OR hour_n < ?5)`,
  )
    .bind(date, net, hour, DAY_LIMIT, HOUR_LIMIT)
    .run();
  return new Response(null, { status: 204 });
};
