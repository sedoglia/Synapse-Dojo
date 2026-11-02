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
  /** Current workout: `round` counts workouts started today, `done` the exercises finished in this one. */
  plan: { date: string; ids: string[]; done?: string[]; round?: number } | null;
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
  const lang: Lang = 'en';
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

/** Keeps only settings of the right type, so a hand-edited or old save can't switch on the wrong option. */
function cleanSettings(saved: unknown): Partial<Settings> {
  if (typeof saved !== 'object' || saved === null) return {};
  const s = saved as Record<string, unknown>;
  const out: Partial<Settings> = {};
  if (typeof s.lang === 'string') out.lang = s.lang as Lang;
  for (const k of ['sound', 'vibration', 'relaxed', 'bigText'] as const) if (typeof s[k] === 'boolean') out[k] = s[k];
  return out;
}

function withDefaults(saved: Partial<SaveData>): SaveData {
  const base = defaults();
  return { ...base, ...saved, settings: { ...base.settings, ...cleanSettings(saved.settings) } };
}

function load(): SaveData {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      raw = localStorage.getItem('synapse-gym/v1');
    }
    if (raw) return withDefaults(JSON.parse(raw) as Partial<SaveData>);
  } catch {
    /* corrupted or unavailable storage: start fresh */
  }
  return defaults();
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isDate = (v: unknown) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
const numbers = (v: unknown) => isObj(v) && Object.values(v).every((n) => typeof n === 'number' && Number.isFinite(n));

/** Checks the shape of an exported save (or a bare SaveData) and returns it completed with defaults, or null. */
export function parseSave(json: unknown): SaveData | null {
  const d = isObj(json) && (json.app === 'synapse-dojo' || json.app === 'synapse-gym') ? json.data : json;
  if (!isObj(d)) return null;
  const ok =
    typeof d.name === 'string' &&
    d.name.length <= 100 &&
    isDate(d.created) &&
    Array.isArray(d.runs) &&
    d.runs.every((r) => isObj(r) && typeof r.ex === 'string' && isDate(r.date) && typeof r.score === 'number' && typeof r.detail === 'string') &&
    Array.isArray(d.checks) &&
    d.checks.every((c) => isObj(c) && isDate(c.date) && typeof c.score === 'number' && numbers(c.parts)) &&
    numbers(d.levels) &&
    (d.history === undefined || (isObj(d.history) && Object.values(d.history).every((pts) => Array.isArray(pts) && pts.every((p) => isObj(p) && isDate(p.date) && typeof p.level === 'number')))) &&
    (d.practiced === undefined || (Array.isArray(d.practiced) && d.practiced.every((x) => typeof x === 'string'))) &&
    (d.plan === undefined || d.plan === null || (isObj(d.plan) && isDate(d.plan.date) && Array.isArray(d.plan.ids) && d.plan.ids.every((x) => typeof x === 'string'))) &&
    (d.xp === undefined || typeof d.xp === 'number') &&
    (d.badges === undefined || (isObj(d.badges) && Object.values(d.badges).every(isDate))) &&
    (d.counters === undefined || numbers(d.counters)) &&
    (d.settings === undefined || isObj(d.settings));
  return ok ? withDefaults(d as Partial<SaveData>) : null;
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

  /** The whole save wrapped with a marker, ready to be downloaded as a file. */
  exportJson(): string {
    return JSON.stringify({ app: 'synapse-dojo', version: 1, exported: new Date().toISOString(), data: this.data }, null, 1);
  },

  replace(data: SaveData) {
    this.data = data;
    this.save();
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
