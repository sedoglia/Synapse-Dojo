/**
 * The daily challenge: one Crack the code lock a day, the same for every player, built from the date (withSeed in
 * dom.ts). The result can be shared as a line of squares, like Wordle's: one per attempt, nothing about the player.
 * It is a puzzle's result, not a measure of the person, so it keeps the rule of the share card (docs §2.7): no name,
 * no age, no Neuro Score.
 */
import { todayKey } from './dom';
import { SITE_URL } from './config';
import { dailyPath } from './seoPages';
import type { DailyRecord } from './storage';

/** Challenge #1 is on this day; the number then grows by one a day, wherever the player is. */
const FIRST_DAY = '2026-11-28';

const dayNumber = (iso: string) => Math.round(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 86400000);

/** The challenge's number for a local date ("#1" on the first day). */
export const dailyNumber = (date = todayKey()) => dayNumber(date) - dayNumber(FIRST_DAY) + 1;

/**
 * The lock's level for a date: from easy on Monday to hardest on Saturday, a middle one on Sunday, as crosswords do.
 * Levels are Crack the code's own (1–8: digits, clues and attempts).
 */
const LEVEL_BY_WEEKDAY = [4, 2, 3, 4, 5, 6, 7]; // Sunday first, as Date.getDay()
export const dailyLevel = (date = todayKey()) => LEVEL_BY_WEEKDAY[new Date(Date.UTC(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10))).getUTCDay()];

/** The seed every device uses for a date's lock. Changing it changes every future lock: never do. */
export const dailySeed = (date = todayKey()) => `synapse-dojo/daily/${date}`;

/** One square per allowed attempt: 🟥 a wrong code, 🟩 the right one, ⬜ an attempt left over. */
export function dailySquares(r: Pick<DailyRecord, 'used' | 'max' | 'solved'>): string {
  return Array.from({ length: r.max }, (_, i) => (i < r.used ? (r.solved && i === r.used - 1 ? '🟩' : '🟥') : '⬜')).join('');
}

/** "1:42" */
export const clock = (secs: number) => `${Math.floor(secs / 60)}:${String(Math.round(secs) % 60).padStart(2, '0')}`;

/** The public page of the challenge in a language, where a shared result leads. */
export const dailyUrl = (lang: string) => `${SITE_URL}${dailyPath(lang)}`;

/** The text that is shared: title line, squares with attempts and time, link. */
export function dailyShareText(r: DailyRecord, title: string, lang: string): string {
  return `${title} 🔓\n${dailySquares(r)} ${r.solved ? r.used : 'X'}/${r.max} · ⏱️ ${clock(r.secs)}\n${dailyUrl(lang)}`;
}

/** Time left until the next challenge (local midnight), as "5 h 12 min". */
export function untilNext(now = new Date()): string {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const mins = Math.max(1, Math.ceil((next.getTime() - now.getTime()) / 60000));
  return mins >= 60 ? `${Math.floor(mins / 60)} h ${mins % 60} min` : `${mins} min`;
}
