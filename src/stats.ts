import { shuffle, todayKey } from './dom';
import { store } from './storage';
import { levelScore } from './adaptive';
import { EXERCISES, DOMAINS, type Domain, type Exercise } from './exercises';

const PLAN_SIZE = 4;

/** 0–100 estimate of current ability on one exercise, or null if never played. */
export function capacity(ex: Exercise): number | null {
  if (!store.lastPlayed(ex.id)) return null;
  if (ex.levels && store.hasLevel(ex.id)) {
    return levelScore(store.level(ex.id, ex.levels.start), ex.levels.min, ex.levels.max);
  }
  // Exercises without levels: average of the last three scores.
  const recent = store.data.runs.filter((r) => r.ex === ex.id).slice(-3);
  return recent.reduce((a, r) => a + r.score, 0) / recent.length;
}

/** Average capacity of the played exercises in a domain (0 if none played yet). */
export function domainScore(d: Domain): number {
  const values = EXERCISES.filter((e) => e.domain === d)
    .map(capacity)
    .filter((v): v is number => v !== null);
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function domainLastPlayed(d: Domain): string {
  return EXERCISES.filter((e) => e.domain === d)
    .map((e) => store.lastPlayed(e.id))
    .sort()
    .pop()!;
}

const runsToday = (ids: string[]) => {
  const today = todayKey();
  return store.data.runs.filter((r) => r.date === today && ids.includes(r.ex)).length;
};

export interface Plan {
  exercises: Exercise[];
  done: Set<string>;
  /** 1 for the first workout of the day, 2 for the second… */
  round: number;
  complete: boolean;
}

function toPlan(saved: NonNullable<typeof store.data.plan>): Plan | null {
  const exercises = saved.ids.map((id) => EXERCISES.find((e) => e.id === id)).filter((e): e is Exercise => !!e);
  if (exercises.length !== saved.ids.length) return null;
  // Plans saved before rounds existed count today's runs as done.
  const done = new Set(saved.done ?? saved.ids.filter((id) => store.playedToday(id)));
  return { exercises, done, round: saved.round ?? 1, complete: exercises.every((e) => done.has(e.id)) };
}

/**
 * Builds a workout: one exercise from each of the four domains trained least today, then least
 * recently, then weakest; within a domain the exercise played least today and longest ago.
 * So a second workout on the same day covers different skills and exercises.
 */
function generate(round: number): Plan {
  const domainIds = (d: string) => EXERCISES.filter((e) => e.domain === d).map((e) => e.id);
  const domains = shuffle(DOMAINS).sort(
    (a, b) =>
      runsToday(domainIds(a)) - runsToday(domainIds(b)) ||
      domainLastPlayed(a).localeCompare(domainLastPlayed(b)) ||
      domainScore(a) - domainScore(b),
  );
  const exercises = domains.slice(0, PLAN_SIZE).map(
    (d) =>
      shuffle(EXERCISES.filter((e) => e.domain === d)).sort(
        (a, b) => runsToday([a.id]) - runsToday([b.id]) || store.lastPlayed(a.id).localeCompare(store.lastPlayed(b.id)),
      )[0],
  );
  store.data.plan = { date: todayKey(), ids: exercises.map((e) => e.id), done: [], round };
  store.save();
  return { exercises, done: new Set(), round, complete: false };
}

/** The workout in progress today (created on first use each day). */
export function currentPlan(): Plan {
  const saved = store.data.plan;
  if (saved?.date === todayKey()) {
    const plan = toPlan(saved);
    if (plan) return plan;
  }
  return generate(1);
}

/** Starts another workout today after the current one is complete. */
export function nextPlan(): Plan {
  const current = currentPlan();
  return current.complete ? generate(current.round + 1) : current;
}

export function markPlanDone(id: string) {
  const saved = store.data.plan;
  if (!saved || saved.date !== todayKey()) return;
  saved.done = [...new Set([...(saved.done ?? []), id])];
  store.save();
}

export const planMinutes = (plan: Exercise[]) => Math.round(plan.reduce((a, e) => a + e.minutes, 0) + plan.length * 0.5);
