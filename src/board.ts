import { h, todayKey, clamp } from './dom';
import { store, type BoardAccount } from './storage';
import { levelScore } from './adaptive';
import { EXERCISES, type Exercise } from './exercises';
import { t, nicknames } from './i18n';

/**
 * Opt-in weekly leaderboard (API in functions/api/). It ranks showing up and getting better, not raw ability:
 * training days, change of level since the start of the week, and the week's best level per exercise.
 * Only this week's summary is ever sent; the training history stays on the device.
 */

export const AGE_BANDS = ['u30', '30-49', '50-64', '65-74', '75+'] as const;
export type AgeBand = (typeof AGE_BANDS)[number];
export type Metric = 'days' | 'improvement' | 'best';

export interface BoardRow {
  /** Shared by equal values ("two players at #3"). */
  rank: number;
  /** Place in the list, ties broken by who got there first. */
  pos: number;
  nameCode: number;
  ageBand: AgeBand | null;
  value: number;
  me?: true;
}

export interface BoardResult {
  week: string;
  total: number;
  top: BoardRow[];
  me: BoardRow | null;
  above: BoardRow[];
  below: BoardRow[];
}

export interface BoardQuery {
  metric: Metric;
  /** Exercise id; omitted for the overall board. Required for `best`. */
  ex?: string;
  band?: AgeBand;
}

/** `offline`: no connection; `human_check`: Turnstile failed; `server`: anything else. */
export class BoardError extends Error {
  constructor(readonly code: 'offline' | 'human_check' | 'server') {
    super(code);
  }
}

/** The generated nickname for a server name code, in the current language ("Swift Otter 42"). */
export function nickname(code: number): string {
  const { adjectives, animals } = nicknames();
  const a = adjectives.length;
  const n = animals.length;
  return t('board.nick', { adj: adjectives[code % a], animal: animals[Math.floor(code / a) % n], n: Math.floor(code / (a * n)) % 100 });
}

/** A message for a failed leaderboard action. */
export const boardErrorText = (e: unknown) => t(`board.err.${e instanceof BoardError ? e.code : 'server'}`);

const API = 'api/';
/** The server accepts one upload every 30 s per player. */
const GAP = 31_000;
const TURNSTILE = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim();

/** The leaderboard needs the Cloudflare API, so it's off when the game is opened from a file. */
export const boardAvailable = () => location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname);

async function call(method: string, path: string, body?: unknown): Promise<Response> {
  const acc = store.data.board;
  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (acc) headers.Authorization = `Bearer ${acc.id}.${acc.secret}`;
  try {
    return await fetch(API + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  } catch {
    throw new BoardError('offline');
  }
}

/** The server forgets players after 90 idle days: then this device is simply off the board again. */
function forget(acc: BoardAccount) {
  if (store.data.board !== acc) return;
  store.data.board = null;
  store.save();
}

// ---- This week's summary ----

const round1 = (v: number) => Math.round(clamp(v, -100, 100) * 10) / 10;
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

/** Monday of the current week, as a local date key. */
function weekStart(d = new Date()): string {
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return todayKey(monday);
}

/**
 * Improvement is measured from the level before this week (or from the first session this week for a
 * new exercise), on the 0–100 scale used everywhere else; exercises without levels use their scores.
 */
function exerciseSummary(ex: Exercise, from: string): { ex: string; improvement: number; best: number } | null {
  const runs = store.data.runs.filter((r) => r.ex === ex.id);
  const week = runs.filter((r) => r.date >= from);
  if (!week.length) return null;
  const points = store.data.history[ex.id] ?? [];
  const thisWeek = points.filter((p) => p.date >= from);
  if (ex.levels && thisWeek.length) {
    const { min, max } = ex.levels;
    const score = (level: number) => levelScore(level, min, max);
    const before = points.filter((p) => p.date < from);
    const base = (before[before.length - 1] ?? thisWeek[0]).level;
    const now = thisWeek[thisWeek.length - 1].level;
    return { ex: ex.id, improvement: round1(score(now) - score(base)), best: Math.round(score(Math.max(...thisWeek.map((p) => p.level)))) };
  }
  const scores = week.map((r) => clamp(r.score, 0, 100));
  const prior = runs.filter((r) => r.date < from).slice(-3).map((r) => clamp(r.score, 0, 100));
  const base = prior.length ? mean(prior) : scores[0];
  return { ex: ex.id, improvement: round1(mean(scores) - base), best: Math.round(Math.max(...scores)) };
}

export function snapshot() {
  const from = weekStart();
  const exercises = EXERCISES.map((e) => exerciseSummary(e, from)).filter((e) => e !== null);
  return {
    today: todayKey(),
    relaxed: store.data.settings.relaxed,
    improvement: exercises.length ? round1(mean(exercises.map((e) => e.improvement))) : 0,
    exercises,
  };
}

// ---- Sending results ----

let lastSent = 0;
let timer: ReturnType<typeof setTimeout> | null = null;
/** Bumped on every new result, so a reply to an older upload doesn't clear `pending`. */
let changes = 0;

function schedule() {
  if (timer || !store.data.board?.pending) return;
  timer = setTimeout(flush, Math.max(0, lastSent + GAP - Date.now()));
}

async function flush() {
  timer = null;
  const acc = store.data.board;
  if (!acc?.pending) return;
  const sent = changes;
  lastSent = Date.now();
  let res: Response;
  try {
    res = await call('POST', 'submit', snapshot());
  } catch {
    return; // offline: retried when the connection is back or at the next start
  }
  if (res.status === 401) return forget(acc);
  if (res.status === 429) return schedule();
  // A rejected snapshot won't get better by resending it, so it is dropped like a sent one.
  if (changes === sent && store.data.board === acc && (res.ok || res.status === 400)) {
    acc.pending = false;
    store.save();
  }
  schedule();
}

/** Call after every saved result. Uploads in the background; never blocks or fails the game. */
export function syncBoard() {
  const acc = store.data.board;
  if (!acc) return;
  changes++;
  if (!acc.pending) {
    acc.pending = true;
    store.save();
  }
  schedule();
}

/** At start-up: sends anything left over from an offline session. */
export function resumeBoardSync() {
  schedule();
  window.addEventListener('online', schedule);
}

// ---- Joining and leaving ----

interface Turnstile {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  remove(id: string): void;
}

let turnstile: Promise<Turnstile> | null = null;

/** Cloudflare's anti-bot check is loaded only when someone joins, never on a normal visit. */
function loadTurnstile(): Promise<Turnstile> {
  turnstile ??= new Promise<Turnstile>((resolve, reject) => {
    const script = h('script', { src: TURNSTILE });
    script.onload = () => {
      const ts = (window as { turnstile?: Turnstile }).turnstile;
      if (ts) resolve(ts);
      else reject(new BoardError('human_check'));
    };
    script.onerror = () => reject(new BoardError('offline'));
    document.head.append(script);
  }).catch((e: unknown) => {
    turnstile = null;
    throw e;
  });
  return turnstile;
}

/** Shows the Turnstile widget in `box` and waits for its token (none needed without a site key, in local tests). */
async function humanToken(box: HTMLElement): Promise<string | undefined> {
  if (!SITE_KEY) return undefined;
  const ts = await loadTurnstile();
  return new Promise<string>((resolve, reject) => {
    const id = ts.render(box, {
      sitekey: SITE_KEY,
      language: 'auto',
      callback: (token: string) => {
        ts.remove(id);
        resolve(token);
      },
      'error-callback': () => {
        ts.remove(id);
        reject(new BoardError('human_check'));
      },
    });
  });
}

/** Joins the leaderboard. `box` hosts the anti-bot check while it runs. */
export async function joinBoard(ageBand: AgeBand | null, box: HTMLElement): Promise<void> {
  if (store.data.board) return;
  const token = await humanToken(box);
  const res = await call('POST', 'join', { ageBand, turnstile: token });
  if (res.status === 403) throw new BoardError('human_check');
  if (!res.ok) throw new BoardError('server');
  const r = (await res.json()) as { id: string; secret: string; nameCode: number; ageBand: string | null };
  store.data.board = { id: r.id, secret: r.secret, nameCode: r.nameCode, ageBand: r.ageBand, pending: false };
  store.save();
  // Today counts as a training day only if there was some training today.
  if (store.activeDays().has(todayKey())) syncBoard();
}

/** Leaves the leaderboard: the server deletes everything about this player at once. */
export async function leaveBoard(): Promise<void> {
  const acc = store.data.board;
  if (!acc) return;
  const res = await call('DELETE', 'me');
  if (!res.ok && res.status !== 401) throw new BoardError('server');
  forget(acc);
}

/** Changes the age band, or draws a new random nickname. */
export async function updateBoardProfile(change: { ageBand?: AgeBand | null; rename?: true }): Promise<void> {
  const acc = store.data.board;
  if (!acc) return;
  const res = await call('PATCH', 'me', change);
  if (res.status === 401) return forget(acc);
  if (!res.ok) throw new BoardError('server');
  const r = (await res.json()) as { nameCode: number; ageBand: string | null };
  if (store.data.board !== acc) return;
  acc.nameCode = r.nameCode;
  acc.ageBand = r.ageBand;
  store.save();
}

/** Reads a board. Relaxed-pace players see, and are ranked in, the relaxed `best` boards. */
export async function fetchBoard(q: BoardQuery): Promise<BoardResult> {
  const params = new URLSearchParams({ metric: q.metric });
  if (q.ex) params.set('ex', q.ex);
  if (q.band) params.set('band', q.band);
  if (q.metric === 'best' && store.data.settings.relaxed) params.set('pace', 'relaxed');
  const acc = store.data.board;
  const res = await call('GET', `board?${params}`);
  if (res.status === 401 && acc) {
    forget(acc);
    return fetchBoard(q);
  }
  if (!res.ok) throw new BoardError('server');
  return (await res.json()) as BoardResult;
}
