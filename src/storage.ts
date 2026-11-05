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
  /** Version of the scoring scale; missing on results from before the recalibration. */
  v?: number;
}

/** Current Neuro Score scale. Older checks stay saved, but are not compared with new ones. */
export const NEURO_SCALE = 3;
/** Current meaning of the exercise levels; a save with a lower number is converted when loaded. */
const BALANCE = 2;

export interface Settings {
  lang: Lang;
  sound: boolean;
  relaxed: boolean;
  bigText: boolean;
  /** Offer to share a milestone when one is earned (sharing from Progress always stays available). */
  shareOffer: boolean;
}

export interface LevelPoint {
  date: string;
  level: number;
}

/** Opt-in leaderboard membership: an anonymous id and the secret that proves it (never exported). */
export interface BoardAccount {
  id: string;
  secret: string;
  /** Turned into a generated nickname in each language. */
  nameCode: number;
  ageBand: string | null;
  /** Results not yet sent (offline, or sent too soon after the previous ones). */
  pending: boolean;
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
  /** Null unless the player joined the leaderboard. */
  board: BoardAccount | null;
  /** Invite code from a group link, kept until the player joins the group or declines. */
  boardInvite: string | null;
  /** The home-screen suggestion to join the leaderboard: hidden until `snoozed` (a date), or for good. */
  boardPrompt: { snoozed?: string; never?: boolean };
  /** Version of the level scales this save uses. */
  balance: number;
  /** Exercises that were redesigned: scores from before this date don't count as personal bests. */
  bestFrom: Record<string, string>;
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
    settings: { lang, sound: true, relaxed: false, bigText: false, shareOffer: true },
    board: null,
    boardInvite: null,
    boardPrompt: {},
    balance: BALANCE,
    bestFrom: {},
  };
}

/** Timed exercises: [start ms, old ratio per level, new ratio per level, old floor, new floor]. */
const TIME_SCALES: Record<string, [number, number, number, number, number]> = {
  reflex: [1100, 0.9, 0.928, 250, 420],
  reaction: [600, 0.9, 0.933, 200, 280],
  flanker: [1400, 0.89, 0.92, 350, 480],
  gonogo: [850, 0.9, 0.93, 260, 330],
  msit: [1800, 0.88, 0.914, 450, 560],
  clash: [3000, 0.88, 0.9, 0, 0],
  crossMove: [1500, 0.89, 0.908, 380, 520],
  fluency: [2200, 0.9, 0.912, 650, 800],
  dualTask: [4000, 0.91, 0.835, 1600, 800],
};
/** Redesigned exercises: what a level meant is gone, so the first session finds the level again. */
const REDESIGNED = ['pilot', 'rhythm', 'stories', 'resources', 'binding', 'tapSeq', 'swipePattern', 'sorting'];

/** The level of the new scale asking for what the old level asked for (the same time limit, ratio or word length). */
function convertLevel(id: string, level: number): number {
  const time = TIME_SCALES[id];
  if (time) {
    const [start, oldRatio, newRatio, oldFloor, newFloor] = time;
    const ms = Math.max(oldFloor, newFloor, start * Math.pow(oldRatio, level - 1));
    return Math.round((1 + Math.log(ms / start) / Math.log(newRatio)) * 10) / 10;
  }
  if (id === 'dots') return Math.round((1 + ((level - 1) * 0.04) / 0.044) * 10) / 10;
  if (id === 'anagrams') return Math.max(1, Math.min(8, 3 + Math.floor(level * 0.6)) - 2);
  return level;
}

/** Brings a save from before the recalibration onto the new level scales. */
function migrate(saved: Partial<SaveData>): Partial<SaveData> {
  if ((saved.balance ?? 1) >= BALANCE) return saved;
  const levels: Record<string, number> = {};
  for (const [id, level] of Object.entries(saved.levels ?? {})) {
    if (!REDESIGNED.includes(id)) levels[id] = convertLevel(id, level);
  }
  const history: Record<string, LevelPoint[]> = {};
  for (const [id, points] of Object.entries(saved.history ?? {})) {
    if (!REDESIGNED.includes(id)) history[id] = points.map((p) => ({ ...p, level: convertLevel(id, p.level) }));
  }
  const today = todayKey();
  return { ...saved, levels, history, balance: BALANCE, bestFrom: Object.fromEntries(REDESIGNED.map((id) => [id, today])) };
}

function cleanPrompt(saved: unknown): SaveData['boardPrompt'] {
  if (typeof saved !== 'object' || saved === null) return {};
  const p = saved as Record<string, unknown>;
  return {
    ...(typeof p.snoozed === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(p.snoozed) ? { snoozed: p.snoozed } : {}),
    ...(p.never === true ? { never: true } : {}),
  };
}

function cleanBoard(saved: unknown): BoardAccount | null {
  if (typeof saved !== 'object' || saved === null) return null;
  const b = saved as Record<string, unknown>;
  const ok =
    typeof b.id === 'string' &&
    /^[0-9a-f-]{36}$/.test(b.id) &&
    typeof b.secret === 'string' &&
    typeof b.nameCode === 'number' &&
    (b.ageBand === null || typeof b.ageBand === 'string');
  return ok ? { id: b.id as string, secret: b.secret as string, nameCode: b.nameCode as number, ageBand: b.ageBand as string | null, pending: b.pending === true } : null;
}

/** Keeps only settings of the right type, so a hand-edited or old save can't switch on the wrong option. */
function cleanSettings(saved: unknown): Partial<Settings> {
  if (typeof saved !== 'object' || saved === null) return {};
  const s = saved as Record<string, unknown>;
  const out: Partial<Settings> = {};
  if (typeof s.lang === 'string') out.lang = s.lang as Lang;
  for (const k of ['sound', 'relaxed', 'bigText', 'shareOffer'] as const) if (typeof s[k] === 'boolean') out[k] = s[k];
  return out;
}

function withDefaults(old: Partial<SaveData>): SaveData {
  const base = defaults();
  const saved = migrate(old);
  return {
    ...base,
    ...saved,
    settings: { ...base.settings, ...cleanSettings(saved.settings) },
    board: cleanBoard(saved.board),
    boardInvite: typeof saved.boardInvite === 'string' && /^[A-Z0-9]{10}$/.test(saved.boardInvite) ? saved.boardInvite : null,
    boardPrompt: cleanPrompt(saved.boardPrompt),
  };
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
  // Leaderboard membership belongs to the device, never to a file.
  return ok ? withDefaults({ ...(d as Partial<SaveData>), board: null }) : null;
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

  /** The whole save wrapped with a marker, ready to be downloaded as a file (without the leaderboard secret). */
  exportJson(): string {
    const data = { ...this.data, board: null };
    return JSON.stringify({ app: 'synapse-dojo', version: 1, exported: new Date().toISOString(), data }, null, 1);
  },

  /** Loads an imported save; this device stays on the leaderboard (or off it), with its pending invite, as before. */
  replace(data: SaveData) {
    this.data = { ...data, board: this.data.board, boardInvite: this.data.boardInvite };
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
    const from = this.data.bestFrom[ex] ?? '';
    const scores = this.data.runs.filter((r) => r.ex === ex && r.date >= from).map((r) => r.score);
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
