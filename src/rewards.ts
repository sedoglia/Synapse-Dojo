import { todayKey } from './dom';
import { store } from './storage';
import type { I18nKey } from './i18n';
import { EXERCISES, DOMAINS } from './exercises';

/**
 * Rewards are for showing up and effort, not just for high scores: everyone at their own level
 * should feel progress. (Gamification raises motivation without changing what is trained.)
 */
export const XP = { exercise: 20, practice: 5, best: 10, levelUp: 5, check: 30, plan: 50 };

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

export const BADGES: Badge[] = [
  { id: 'first', icon: '🌱', name: 'badge.first.name', desc: 'badge.first.desc', progress: () => frac(store.data.runs.length, 1) },
  { id: 'check', icon: '📏', name: 'badge.check.name', desc: 'badge.check.desc', progress: () => frac(store.data.checks.length, 1) },
  { id: 'plan', icon: '📅', name: 'badge.plan.name', desc: 'badge.plan.desc', progress: () => frac(store.data.counters.plans ?? 0, 1) },
  { id: 'streak3', icon: '🔥', name: 'badge.streak3.name', desc: 'badge.streak3.desc', progress: () => frac(store.streak(), 3) },
  { id: 'week4', icon: '🎯', name: 'badge.week4.name', desc: 'badge.week4.desc', progress: () => frac(store.daysThisWeek(), 4) },
  { id: 'streak7', icon: '☄️', name: 'badge.streak7.name', desc: 'badge.streak7.desc', progress: () => frac(store.streak(), 7) },
  { id: 'combo10', icon: '⚡', name: 'badge.combo10.name', desc: 'badge.combo10.desc', progress: () => frac(store.data.bestStreak, 10) },
  { id: 'explorer', icon: '🧭', name: 'badge.explorer.name', desc: 'badge.explorer.desc', progress: () => frac(playedIds().size, EXERCISES.length) },
  { id: 'balanced', icon: '🌈', name: 'badge.balanced.name', desc: 'badge.balanced.desc', progress: () => frac(domainsLastWeek(), DOMAINS.length) },
  { id: 'levelups25', icon: '📈', name: 'badge.levelups25.name', desc: 'badge.levelups25.desc', progress: () => frac(store.data.counters.levelUps ?? 0, 25) },
  { id: 'plans10', icon: '🗓️', name: 'badge.plans10.name', desc: 'badge.plans10.desc', progress: () => frac(store.data.counters.plans ?? 0, 10) },
  { id: 'combo25', icon: '🌩️', name: 'badge.combo25.name', desc: 'badge.combo25.desc', progress: () => frac(store.data.bestStreak, 25) },
  { id: 'nback3', icon: '🔁', name: 'badge.nback3.name', desc: 'badge.nback3.desc', progress: () => frac(level('echo'), 5) },
  { id: 'span7', icon: '💡', name: 'badge.span7.name', desc: 'badge.span7.desc', progress: () => frac(level('grid'), 7) },
  { id: 'glance50', icon: '👁️', name: 'badge.glance50.name', desc: 'badge.glance50.desc', progress: () => frac(level('glance'), 18) },
  { id: 'neuro800', icon: '🧠', name: 'badge.neuro800.name', desc: 'badge.neuro800.desc', progress: () => frac(Math.max(0, ...store.data.checks.map((c) => c.score)), 800) },
  { id: 'streak30', icon: '🏆', name: 'badge.streak30.name', desc: 'badge.streak30.desc', progress: () => frac(store.streak(), 30) },
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
