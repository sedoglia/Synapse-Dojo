import { todayKey } from './dom';
import { store } from './storage';
import type { I18nKey } from './i18n';
import { EXERCISES, DOMAINS } from './exercises';

/**
 * Rewards are for showing up and effort, not just for high scores: everyone at their own level
 * should feel progress. (Gamification raises motivation without changing what is trained.)
 */
export const XP = { exercise: 20, practice: 5, best: 10, levelUp: 5, speed: 10, check: 30, plan: 50 };

/** Player level n needs 50·n·(n−1) XP in total: 100 for level 2, 300 for 3, 600 for 4… */
export function playerLevel(xp = store.data.xp): { level: number; from: number; to: number } {
  let n = 1;
  while (xp >= 50 * n * (n + 1)) n++;
  return { level: n, from: 50 * n * (n - 1), to: 50 * n * (n + 1) };
}

export function addXp(amount: number): { gained: number; levelUp: boolean } {
  const before = playerLevel().level;
  store.data.xp += amount;
  store.save();
  return { gained: amount, levelUp: playerLevel().level > before };
}

export interface Badge {
  id: string;
  icon: string;
  name: I18nKey;
  desc: I18nKey;
  /** 0–1; 1 means earned. */
  progress(): number;
}

const frac = (have: number, need: number) => Math.min(1, have / need);
const level = (id: string) => store.data.levels[id] ?? 0;
const playedIds = () => new Set(store.data.runs.map((r) => r.ex));

function domainsLastWeek(): number {
  const since = new Date();
  since.setDate(since.getDate() - 6);
  const from = todayKey(since);
  const ids = new Set(store.data.runs.filter((r) => r.date >= from).map((r) => r.ex));
  return new Set(EXERCISES.filter((e) => ids.has(e.id)).map((e) => e.domain)).size;
}

function speedBonusesCount(): number {
  const c = store.data.counters.speedBonuses ?? 0;
  if (c === 0 && store.data.runs.length > 0) {
    const fromRuns = store.data.runs.filter((r) => r.detail && r.detail.includes('+') && r.detail.includes('s')).length;
    if (fromRuns > 0) return fromRuns;
  }
  return c;
}

function hasActiveWeekend(): boolean {
  const days = store.activeDays();
  for (const day of days) {
    const d = new Date(day + 'T12:00:00');
    if (d.getDay() === 0) {
      d.setDate(d.getDate() - 1);
      if (days.has(todayKey(d))) return true;
    }
  }
  return false;
}

function bilateralPlayed(): number {
  const played = playedIds();
  const bilateralIds = EXERCISES.filter((e) => e.domain === 'coordination').map((e) => e.id);
  return bilateralIds.filter((id) => played.has(id)).length;
}

function domainsToday(): number {
  const today = todayKey();
  const ids = new Set(store.data.runs.filter((r) => r.date === today).map((r) => r.ex));
  return new Set(EXERCISES.filter((e) => ids.has(e.id)).map((e) => e.domain)).size;
}

export const BADGES: Badge[] = [
  // --- First steps & quick wins (Immediate positive RPE, Schultz 1998) ---
  { id: 'first', icon: '🌱', name: 'badge.first.name', desc: 'badge.first.desc', progress: () => frac(store.data.runs.length, 1) },
  { id: 'check', icon: '📏', name: 'badge.check.name', desc: 'badge.check.desc', progress: () => frac(store.data.checks.length, 1) },
  { id: 'plan', icon: '📅', name: 'badge.plan.name', desc: 'badge.plan.desc', progress: () => frac(store.data.counters.plans ?? 0, 1) },
  { id: 'combo5', icon: '✨', name: 'badge.combo5.name', desc: 'badge.combo5.desc', progress: () => frac(store.data.bestStreak, 5) },
  { id: 'combo10', icon: '⚡', name: 'badge.combo10.name', desc: 'badge.combo10.desc', progress: () => frac(store.data.bestStreak, 10) },
  { id: 'combo25', icon: '🌩️', name: 'badge.combo25.name', desc: 'badge.combo25.desc', progress: () => frac(store.data.bestStreak, 25) },
  { id: 'combo50', icon: '🌊', name: 'badge.combo50.name', desc: 'badge.combo50.desc', progress: () => frac(store.data.bestStreak, 50) },

  // --- Habit formation & Spacing (Lally et al. 2010; Hebb 1949; Cepeda et al. 2006) ---
  { id: 'streak3', icon: '🔥', name: 'badge.streak3.name', desc: 'badge.streak3.desc', progress: () => frac(store.streak(), 3) },
  { id: 'week4', icon: '🎯', name: 'badge.week4.name', desc: 'badge.week4.desc', progress: () => frac(store.daysThisWeek(), 4) },
  { id: 'streak7', icon: '☄️', name: 'badge.streak7.name', desc: 'badge.streak7.desc', progress: () => frac(store.streak(), 7) },
  { id: 'week7', icon: '🌟', name: 'badge.week7.name', desc: 'badge.week7.desc', progress: () => frac(store.daysThisWeek(), 7) },
  { id: 'streak14', icon: '⚡', name: 'badge.streak14.name', desc: 'badge.streak14.desc', progress: () => frac(store.streak(), 14) },
  { id: 'streak21', icon: '🛡️', name: 'badge.streak21.name', desc: 'badge.streak21.desc', progress: () => frac(store.streak(), 21) },
  { id: 'streak30', icon: '🏆', name: 'badge.streak30.name', desc: 'badge.streak30.desc', progress: () => frac(store.streak(), 30) },
  { id: 'streak60', icon: '🛤️', name: 'badge.streak60.name', desc: 'badge.streak60.desc', progress: () => frac(store.streak(), 60) },
  { id: 'streak100', icon: '👑', name: 'badge.streak100.name', desc: 'badge.streak100.desc', progress: () => frac(store.streak(), 100) },
  { id: 'weekend', icon: '🏖️', name: 'badge.weekend.name', desc: 'badge.weekend.desc', progress: () => (hasActiveWeekend() ? 1 : 0) },
  { id: 'earlyBird', icon: '🌅', name: 'badge.earlyBird.name', desc: 'badge.earlyBird.desc', progress: () => frac(store.data.counters.earlyBird ?? 0, 1) },

  // --- Dedication & Workout Volume (Ebbinghaus 1885; Ball et al. 2002) ---
  { id: 'plans5', icon: '🌿', name: 'badge.plans5.name', desc: 'badge.plans5.desc', progress: () => frac(store.data.counters.plans ?? 0, 5) },
  { id: 'plans10', icon: '🗓️', name: 'badge.plans10.name', desc: 'badge.plans10.desc', progress: () => frac(store.data.counters.plans ?? 0, 10) },
  { id: 'plans25', icon: '🌲', name: 'badge.plans25.name', desc: 'badge.plans25.desc', progress: () => frac(store.data.counters.plans ?? 0, 25) },
  { id: 'plans50', icon: '🏛️', name: 'badge.plans50.name', desc: 'badge.plans50.desc', progress: () => frac(store.data.counters.plans ?? 0, 50) },
  { id: 'plans100', icon: '💎', name: 'badge.plans100.name', desc: 'badge.plans100.desc', progress: () => frac(store.data.counters.plans ?? 0, 100) },
  { id: 'runs10', icon: '🚀', name: 'badge.runs10.name', desc: 'badge.runs10.desc', progress: () => frac(store.data.runs.length, 10) },
  { id: 'runs50', icon: '🥊', name: 'badge.runs50.name', desc: 'badge.runs50.desc', progress: () => frac(store.data.runs.length, 50) },
  { id: 'runs100', icon: '💯', name: 'badge.runs100.name', desc: 'badge.runs100.desc', progress: () => frac(store.data.runs.length, 100) },
  { id: 'runs250', icon: '🌌', name: 'badge.runs250.name', desc: 'badge.runs250.desc', progress: () => frac(store.data.runs.length, 250) },
  { id: 'runs500', icon: '🎖️', name: 'badge.runs500.name', desc: 'badge.runs500.desc', progress: () => frac(store.data.runs.length, 500) },
  { id: 'checks7', icon: '📊', name: 'badge.checks7.name', desc: 'badge.checks7.desc', progress: () => frac(store.data.checks.length, 7) },
  { id: 'checks30', icon: '🔬', name: 'badge.checks30.name', desc: 'badge.checks30.desc', progress: () => frac(store.data.checks.length, 30) },

  // --- Multidomain Exploration & Reserve (Stern 2002; Swinnen 2002; Livingston 2024) ---
  { id: 'explorer10', icon: '🧭', name: 'badge.explorer10.name', desc: 'badge.explorer10.desc', progress: () => frac(playedIds().size, 10) },
  { id: 'explorer20', icon: '🗺️', name: 'badge.explorer20.name', desc: 'badge.explorer20.desc', progress: () => frac(playedIds().size, 20) },
  { id: 'explorer', icon: '🌍', name: 'badge.explorer.name', desc: 'badge.explorer.desc', progress: () => frac(playedIds().size, EXERCISES.length) },
  { id: 'balanced', icon: '🌈', name: 'badge.balanced.name', desc: 'badge.balanced.desc', progress: () => frac(domainsLastWeek(), DOMAINS.length) },
  { id: 'multidomain5', icon: '🔮', name: 'badge.multidomain5.name', desc: 'badge.multidomain5.desc', progress: () => frac(domainsToday(), 5) },
  { id: 'bilateralAll', icon: '👐', name: 'badge.bilateralAll.name', desc: 'badge.bilateralAll.desc', progress: () => frac(bilateralPlayed(), 5) },

  // --- Growth, Level-ups & Processing Speed (Kaernbach 1991; Ratcliff & McKoon 2008) ---
  { id: 'levelups25', icon: '📈', name: 'badge.levelups25.name', desc: 'badge.levelups25.desc', progress: () => frac(store.data.counters.levelUps ?? 0, 25) },
  { id: 'levelups50', icon: '🏔️', name: 'badge.levelups50.name', desc: 'badge.levelups50.desc', progress: () => frac(store.data.counters.levelUps ?? 0, 50) },
  { id: 'levelups100', icon: '🌠', name: 'badge.levelups100.name', desc: 'badge.levelups100.desc', progress: () => frac(store.data.counters.levelUps ?? 0, 100) },
  { id: 'speed10', icon: '🐇', name: 'badge.speed10.name', desc: 'badge.speed10.desc', progress: () => frac(speedBonusesCount(), 10) },
  { id: 'speed50', icon: '⚡', name: 'badge.speed50.name', desc: 'badge.speed50.desc', progress: () => frac(speedBonusesCount(), 50) },

  // --- Progression & Experience (Ryan & Deci 2000; Hull 1932) ---
  { id: 'xp1000', icon: '🔋', name: 'badge.xp1000.name', desc: 'badge.xp1000.desc', progress: () => frac(store.data.xp, 1000) },
  { id: 'xp5000', icon: '⚡', name: 'badge.xp5000.name', desc: 'badge.xp5000.desc', progress: () => frac(store.data.xp, 5000) },
  { id: 'xp10000', icon: '💫', name: 'badge.xp10000.name', desc: 'badge.xp10000.desc', progress: () => frac(store.data.xp, 10000) },
  { id: 'xp25000', icon: '🌌', name: 'badge.xp25000.name', desc: 'badge.xp25000.desc', progress: () => frac(store.data.xp, 25000) },
  { id: 'level5', icon: '🥋', name: 'badge.level5.name', desc: 'badge.level5.desc', progress: () => frac(playerLevel().level, 5) },
  { id: 'level10', icon: '🥋', name: 'badge.level10.name', desc: 'badge.level10.desc', progress: () => frac(playerLevel().level, 10) },

  // --- Specific Cognitive Mastery Benchmarks ---
  { id: 'nback3', icon: '🔁', name: 'badge.nback3.name', desc: 'badge.nback3.desc', progress: () => frac(level('echo'), 5) },
  { id: 'span7', icon: '💡', name: 'badge.span7.name', desc: 'badge.span7.desc', progress: () => frac(level('grid'), 7) },
  { id: 'glance50', icon: '👁️', name: 'badge.glance50.name', desc: 'badge.glance50.desc', progress: () => frac(level('glance'), 18) },
  { id: 'towersMaster', icon: '🗼', name: 'badge.towersMaster.name', desc: 'badge.towersMaster.desc', progress: () => frac(level('towers'), 6) },
  { id: 'mathMaster', icon: '➗', name: 'badge.mathMaster.name', desc: 'badge.mathMaster.desc', progress: () => frac(level('math'), 6) },
  { id: 'tangramMaster', icon: '🧩', name: 'badge.tangramMaster.name', desc: 'badge.tangramMaster.desc', progress: () => frac(level('tangram'), 6) },
  { id: 'neuro800', icon: '🧠', name: 'badge.neuro800.name', desc: 'badge.neuro800.desc', progress: () => frac(Math.max(0, ...store.data.checks.map((c) => c.score)), 800) },
];

export const earned = (b: Badge) => b.id in store.data.badges;

/** Awards any badge whose goal is now met; returns the newly earned ones. */
export function checkBadges(): Badge[] {
  const fresh = BADGES.filter((b) => !earned(b) && b.progress() >= 1);
  for (const b of fresh) store.data.badges[b.id] = todayKey();
  if (fresh.length) store.save();
  return fresh;
}

/** The unearned badge closest to completion: a concrete reason to come back. */
export function nextBadge(): Badge | undefined {
  return BADGES.filter((b) => !earned(b))
    .map((b) => ({ b, p: b.progress() }))
    .sort((x, y) => y.p - x.p)[0]?.b;
}

/** The unearned badges closest to completion: triggers the Goal-Gradient effect (Hull 1932; Kivetz 2006). */
export function nearBadges(limit = 3): { badge: Badge; progress: number }[] {
  const unearned = BADGES.filter((b) => !earned(b)).map((b) => ({ badge: b, progress: b.progress() }));
  const inProgress = unearned.filter((x) => x.progress > 0).sort((a, b) => b.progress - a.progress);
  if (inProgress.length >= limit) return inProgress.slice(0, limit);
  const remaining = unearned.filter((x) => x.progress === 0);
  return [...inProgress, ...remaining].slice(0, limit);
}
