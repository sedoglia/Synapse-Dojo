import { ALL, SUBMIT_INTERVAL, authenticate, fail, isExId, json, localDay, maybeCleanUp, popcount, readBody, type Handler } from '../../server/board';

const MAX_EXERCISES = 40;
const isImprovement = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= -100 && v <= 100;
const isBest = (v: unknown): v is number => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 100;

/**
 * Weekly snapshot sent after a session:
 * { today: "YYYY-MM-DD", relaxed, improvement, exercises: [{ ex, improvement, best }] }.
 * Training days are counted here, one per local date the results arrive on, so they can't be backdated.
 * The week's best per exercise only goes up; improvement is replaced (it can fall back).
 */
export const onRequestPost: Handler = async ({ request, env, waitUntil }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const now = Date.now();
  if (now - player.last_submit < SUBMIT_INTERVAL * 1000) return fail(429, 'too_soon');

  const body = await readBody(request);
  if (!body) return fail(400, 'bad_body');
  const day = localDay(body.today);
  if (!day) return fail(400, 'bad_date');
  if (typeof body.relaxed !== 'boolean' || !isImprovement(body.improvement)) return fail(400, 'bad_body');
  const list = body.exercises;
  if (!Array.isArray(list) || list.length > MAX_EXERCISES) return fail(400, 'bad_exercises');
  const exercises = new Map<string, { improvement: number; best: number }>();
  for (const e of list) {
    if (typeof e !== 'object' || e === null) return fail(400, 'bad_exercises');
    const { ex, improvement, best } = e as Record<string, unknown>;
    if (!isExId(ex) || ex === ALL || !isImprovement(improvement) || !isBest(best)) return fail(400, 'bad_exercises');
    exercises.set(ex, { improvement, best });
  }

  const db = env.DB;
  const prev = await db
    .prepare('SELECT day_mask FROM entries WHERE player_id = ? AND week = ? AND ex = ?')
    .bind(player.id, day.week, ALL)
    .first<{ day_mask: number }>();
  const mask = (prev?.day_mask ?? 0) | day.bit;
  const relaxed = body.relaxed ? 1 : 0;

  const upsert = db.prepare(
    `INSERT INTO entries (player_id, week, ex, day_mask, days, improvement, best, relaxed, updated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT (player_id, week, ex) DO UPDATE SET
       day_mask = excluded.day_mask, days = excluded.days, improvement = excluded.improvement,
       best = MAX(best, excluded.best), relaxed = MAX(relaxed, excluded.relaxed), updated = excluded.updated`,
  );
  await db.batch([
    upsert.bind(player.id, day.week, ALL, mask, popcount(mask), body.improvement, 0, relaxed, now),
    ...[...exercises].map(([ex, e]) => upsert.bind(player.id, day.week, ex, 0, 0, e.improvement, e.best, relaxed, now)),
    db.prepare('UPDATE players SET last_seen = ?, last_submit = ? WHERE id = ?').bind(now, now, player.id),
  ]);
  waitUntil(maybeCleanUp(env));
  return json({ week: day.week, days: popcount(mask) });
};
