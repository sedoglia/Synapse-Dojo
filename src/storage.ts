import { STORAGE_KEY } from './config';
import type { Lang } from './i18n';
import { todayKey } from './dom';

export interface RunRecord {
  ex: string;
  date: string; // YYYY-MM-DD
  score: number; // 0–100
  detail: string;
}

export interface CheckRecord {
  date: string;
  score: number; // 0–1000
  parts: Record<string, number>;
}

export interface SaveData {
  name: string;
  created: string;
  runs: RunRecord[];
  checks: CheckRecord[];
  settings: { lang: Lang; sound: boolean };
}

function defaults(): SaveData {
  const lang: Lang = navigator.language?.toLowerCase().startsWith('it') ? 'it' : 'en';
  return { name: '', created: todayKey(), runs: [], checks: [], settings: { lang, sound: true } };
}

function load(): SaveData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults(), ...JSON.parse(raw) };
  } catch {
    /* corrupted or unavailable storage: start fresh */
  }
  return defaults();
}

export const store = {
  data: load(),

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      /* storage full or blocked: keep playing in memory */
    }
  },

  reset() {
    const { lang } = this.data.settings;
    this.data = defaults();
    this.data.settings.lang = lang;
    this.save();
  },

  addRun(run: RunRecord) {
    this.data.runs.push(run);
    this.save();
  },

  addCheck(check: CheckRecord) {
    this.data.checks.push(check);
    this.save();
  },

  best(ex: string): number | null {
    const scores = this.data.runs.filter((r) => r.ex === ex).map((r) => r.score);
    return scores.length ? Math.max(...scores) : null;
  },

  playedToday(ex: string) {
    const today = todayKey();
    return this.data.runs.some((r) => r.ex === ex && r.date === today);
  },

  todayCheck(): CheckRecord | undefined {
    const today = todayKey();
    return this.data.checks.find((c) => c.date === today);
  },

  activeDays(): Set<string> {
    return new Set([...this.data.runs.map((r) => r.date), ...this.data.checks.map((c) => c.date)]);
  },

  /** Consecutive days of activity, ending today (or yesterday if today is still open). */
  streak(): number {
    const days = this.activeDays();
    const d = new Date();
    if (!days.has(todayKey(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    while (days.has(todayKey(d))) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  },
};
