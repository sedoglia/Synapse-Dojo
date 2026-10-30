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

/**
 * Today's workout: one exercise from each of the four least recently trained domains,
 * weaker domains first on ties, and within a domain the exercise played longest ago.
 * Fixed for the whole day once generated.
 */
export function dailyPlan(): Exercise[] {
  const today = todayKey();
  const saved = store.data.plan;
  if (saved?.date === today) {
    const exs = saved.ids.map((id) => EXERCISES.find((e) => e.id === id)).filter((e): e is Exercise => !!e);
    if (exs.length === saved.ids.length) return exs;
  }

  const domains = shuffle(DOMAINS).sort(
    (a, b) => domainLastPlayed(a).localeCompare(domainLastPlayed(b)) || domainScore(a) - domainScore(b),
  );
  const plan = domains.slice(0, PLAN_SIZE).map((d) =>
    shuffle(EXERCISES.filter((e) => e.domain === d)).sort((a, b) => store.lastPlayed(a.id).localeCompare(store.lastPlayed(b.id)))[0],
  );
  store.data.plan = { date: today, ids: plan.map((e) => e.id) };
  store.save();
  return plan;
}

export const planMinutes = (plan: Exercise[]) => Math.round(plan.reduce((a, e) => a + e.minutes, 0) + plan.length * 0.5);
