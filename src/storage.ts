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

export interface Settings {
  lang: Lang;
  sound: boolean;
  vibration: boolean;
  relaxed: boolean;
  bigText: boolean;
}

export interface LevelPoint {
  date: string;
  level: number;
}

export interface SaveData {
  name: string;
  created: string;
  runs: RunRecord[];
  checks: CheckRecord[];
  levels: Record<string, number>;
  plan: { date: string; ids: string[] } | null;
  /** Level after each gym session, per exercise (most recent last). */
  history: Record<string, LevelPoint[]>;
  /** Exercises whose guided practice has been completed or skipped. */
  practiced: string[];
  xp: number;
  /** Earned badge id → date. */
  badges: Record<string, string>;
  bestStreak: number;
  /** Lifetime counters for badges (completed plans, level-ups, …). */
  counters: Record<string, number>;
  settings: Settings;
}

function defaults(): SaveData {
  const lang: Lang = navigator.language?.toLowerCase().startsWith('it') ? 'it' : 'en';
  return {
    name: '',
    created: todayKey(),
    runs: [],
    checks: [],
    levels: {},
    plan: null,
    history: {},
    practiced: [],
    xp: 0,
    badges: {},
    bestStreak: 0,
    counters: {},
    settings: { lang, sound: true, vibration: true, relaxed: false, bigText: false },
  };
}

function load(): SaveData {
  const base = defaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<SaveData>;
      return { ...base, ...saved, settings: { ...base.settings, ...saved.settings } };
    }
  } catch {
    /* corrupted or unavailable storage: start fresh */
  }
  return base;
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

  level(id: string, fallback: number): number {
    return this.data.levels[id] ?? fallback;
  },

  hasLevel(id: string): boolean {
    return id in this.data.levels;
  },

  setLevel(id: string, level: number) {
    this.data.levels[id] = level;
    const h = (this.data.history[id] ??= []);
    h.push({ date: todayKey(), level });
    if (h.length > 120) h.splice(0, h.length - 120);
    this.save();
  },

  bump(counter: string, by = 1) {
    this.data.counters[counter] = (this.data.counters[counter] ?? 0) + by;
    this.save();
  },

  best(ex: string): number | null {
    const scores = this.data.runs.filter((r) => r.ex === ex).map((r) => r.score);
    return scores.length ? Math.max(...scores) : null;
  },

  lastPlayed(ex: string): string {
    let last = '';
    for (const r of this.data.runs) if (r.ex === ex && r.date > last) last = r.date;
    return last;
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

  /**
   * Days of activity in a row, ending today (or yesterday if today is still open).
   * One rest day per week doesn't break the streak: missing a day shouldn't wipe out weeks of effort.
   */
  streak(): number {
    const days = this.activeDays();
    const d = new Date();
    if (!days.has(todayKey(d))) d.setDate(d.getDate() - 1);
    let n = 0;
    let sinceRest = 7;
    for (;;) {
      if (days.has(todayKey(d))) {
        n++;
        sinceRest++;
      } else {
        const before = new Date(d);
        before.setDate(before.getDate() - 1);
        if (n === 0 || sinceRest < 7 || !days.has(todayKey(before))) break;
        sinceRest = 0; // use the rest day
      }
      d.setDate(d.getDate() - 1);
    }
    return n;
  },

  /** Active days in the current week (Monday to Sunday). */
  daysThisWeek(): number {
    const days = this.activeDays();
    const d = new Date();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    let n = 0;
    for (const x = new Date(monday); x <= d; x.setDate(x.getDate() + 1)) if (days.has(todayKey(x))) n++;
    return n;
  },
};
