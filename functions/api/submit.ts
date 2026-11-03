import {
  ALL,
  SUBMIT_INTERVAL,
  authenticate,
  consistencyPoints,
  fail,
  isExId,
  json,
  localDay,
  parseCounts,
  readBody,
  type Handler,
} from '../../server/board';

const MAX_EXERCISES = 40;
/** Stored per day; only the first 12 earn points, the rest is kept to show how much someone trained. */
const MAX_PER_DAY = 100;
const isImprovement = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v >= -100 && v <= 100;
const isBest = (v: unknown): v is number => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 100;

/**
 * Weekly snapshot sent after a session:
 * { today: "YYYY-MM-DD", todayCount, relaxed, improvement, exercises: [{ ex, improvement, best }] }.
 * `todayCount` is how many activities (exercises and Neuro checks) the player finished today. It counts only for
 * the local date the results arrive on, so days can't be backdated, and it can grow by at most one activity per
 * minute since the previous upload, which is faster than anyone can play.
 * The week's best per exercise only goes up; improvement is replaced (it can fall back).
 * Each value has its own "reached at" time, used to break ties in favour of whoever got there first.
 */
export const onRequestPost: Handler = async ({ request, env }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const now = Date.now();
  if (now - player.last_submit < SUBMIT_INTERVAL * 1000) return fail(429, 'too_soon');

  const body = await readBody(request);
  if (!body) return fail(400, 'bad_body');
  const day = localDay(body.today);
  if (!day) return fail(400, 'bad_date');
  if (typeof body.relaxed !== 'boolean' || !isImprovement(body.improvement)) return fail(400, 'bad_body');
  // Version 0.8.0 of the app sent no count: an upload means at least one activity today.
  const todayCount = body.todayCount ?? 1;
  if (!Number.isInteger(todayCount) || (todayCount as number) < 1 || (todayCount as number) > MAX_PER_DAY) return fail(400, 'bad_body');
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
    .prepare('SELECT day_counts FROM entries WHERE player_id = ? AND week = ? AND ex = ?')
    .bind(player.id, day.week, ALL)
    .first<{ day_counts: string }>();
  const counts = parseCounts(prev?.day_counts);
  const growth = Math.max(1, Math.floor((now - player.last_submit) / 60_000));
  counts[day.day] = Math.min(Math.max(counts[day.day], todayCount as number), counts[day.day] + growth, MAX_PER_DAY);
  const days = counts.filter((c) => c > 0).length;
  const mask = counts.reduce((m, c, i) => (c > 0 ? m | (1 << i) : m), 0);
  const points = consistencyPoints(counts);
  const relaxed = body.relaxed ? 1 : 0;

  // In ON CONFLICT … DO UPDATE every right-hand side reads the row as it was, so the order of the SET list doesn't matter.
  const overall = db.prepare(
    `INSERT INTO entries (player_id, week, ex, day_mask, day_counts, days, points, improvement, relaxed, updated, points_at, improvement_at, best_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?10, ?10, ?10)
     ON CONFLICT (player_id, week, ex) DO UPDATE SET
       points_at = CASE WHEN excluded.points <> points THEN excluded.updated ELSE points_at END,
       improvement_at = CASE WHEN excluded.improvement <> improvement THEN excluded.updated ELSE improvement_at END,
       day_mask = excluded.day_mask, day_counts = excluded.day_counts, days = excluded.days, points = excluded.points,
       improvement = excluded.improvement, relaxed = MAX(relaxed, excluded.relaxed), updated = excluded.updated`,
  );
  const perExercise = db.prepare(
    `INSERT INTO entries (player_id, week, ex, improvement, best, relaxed, updated, points_at, improvement_at, best_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?7, ?7, ?7)
     ON CONFLICT (player_id, week, ex) DO UPDATE SET
       improvement_at = CASE WHEN excluded.improvement <> improvement THEN excluded.updated ELSE improvement_at END,
       best_at = CASE WHEN excluded.best > best THEN excluded.updated ELSE best_at END,
       improvement = excluded.improvement, best = MAX(best, excluded.best),
       relaxed = MAX(relaxed, excluded.relaxed), updated = excluded.updated`,
  );
  await db.batch([
    overall.bind(player.id, day.week, ALL, mask, JSON.stringify(counts), days, points, body.improvement, relaxed, now),
    ...[...exercises].map(([ex, e]) => perExercise.bind(player.id, day.week, ex, e.improvement, e.best, relaxed, now)),
    db.prepare('UPDATE players SET last_seen = ?, last_submit = ? WHERE id = ?').bind(now, now, player.id),
  ]);
  return json({ week: day.week, days, points, todayCount: counts[day.day] });
};
