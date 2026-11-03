import { h, todayKey, clamp } from './dom';
import { store, type BoardAccount } from './storage';
import { levelScore, DETRAIN_DAYS } from './adaptive';
import { EXERCISES, type Exercise } from './exercises';
import { t, nicknames } from './i18n';

/**
 * Opt-in weekly leaderboard (API in functions/api/). It ranks showing up and getting better, not raw ability:
 * consistency (training days and how much was trained on each), change of level since the start of the week,
 * and the week's best level per exercise; for everyone or within private groups of friends.
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
  /** Consistency only: training days and point-earning activities behind the points. */
  days?: number;
  activities?: number;
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
  /** Group id: only its members. */
  group?: string;
}

type ErrorCode = 'offline' | 'human_check' | 'server' | 'not_member' | 'not_found' | 'limit' | 'full' | 'bad_name';

/** `offline`: no connection; `human_check`: Turnstile failed; group errors; `server`: anything else. */
export class BoardError extends Error {
  constructor(readonly code: ErrorCode) {
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
export function boardErrorText(e: unknown): string {
  const code = e instanceof BoardError ? e.code : 'server';
  if (code === 'offline' || code === 'human_check' || code === 'server') return t(`board.err.${code}`);
  return t(`groups.err.${code}`);
}

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

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

/** Whole days from one date key to another (the game measures breaks the same way). */
const daysBetween = (a: string, b: string) => (new Date(b).getTime() - new Date(a).getTime()) / 86_400_000;

/** Monday of the current week, as a local date key. */
function weekStart(d = new Date()): string {
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return todayKey(monday);
}

/** ISO week of the local date ("2026-W45"): the board shown is the week the player is living in, not the server's. */
export function localWeek(d = new Date()): string {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 3 - ((t.getUTCDay() + 6) % 7)); // Thursday of the same week
  const week = Math.ceil(((t.getTime() - Date.UTC(t.getUTCFullYear(), 0, 1)) / 86_400_000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

interface ExerciseSummary {
  ex: string;
  improvement: number;
  best: number;
  /** False when the exercise is new this week, so there is no earlier level to improve on. */
  baseline: boolean;
}

/**
 * Improvement on the 0–100 scale used everywhere else. Exercises with levels: from the level reached before this
 * week, or from the starting level for an exercise first played this week (so the first session counts too).
 * After a break of more than DETRAIN_DAYS the game restarts one level lower, and so does the baseline: coming back
 * must never start with a loss.
 * The one exercise without levels: median of the last three scores this week against the three before it, which
 * a single lucky or unlucky game can't swing.
 */
function exerciseSummary(ex: Exercise, from: string): ExerciseSummary | null {
  const runs = store.data.runs.filter((r) => r.ex === ex.id);
  const week = runs.filter((r) => r.date >= from);
  if (!week.length) return null;
  const points = store.data.history[ex.id] ?? [];
  const thisWeek = points.filter((p) => p.date >= from);
  if (ex.levels && thisWeek.length) {
    const { min, max, start } = ex.levels;
    const score = (level: number) => levelScore(level, min, max);
    const before = points.filter((p) => p.date < from);
    let base = before.length ? before[before.length - 1].level : start;
    const lastBefore = runs.filter((r) => r.date < from).pop()?.date;
    // The game compares the time of the session with the start of the last day played, so a gap of exactly
    // DETRAIN_DAYS calendar days already counts as a break (only a session just after midnight wouldn't).
    if (lastBefore && daysBetween(lastBefore, week[0].date) >= DETRAIN_DAYS) base = Math.max(min, base - 1);
    const now = thisWeek[thisWeek.length - 1].level;
    const best = Math.max(...thisWeek.map((p) => p.level));
    return { ex: ex.id, improvement: round1(score(now) - score(base)), best: Math.round(score(best)), baseline: before.length > 0 };
  }
  const scores = week.map((r) => clamp(r.score, 0, 100));
  const prior = runs.filter((r) => r.date < from).slice(-3).map((r) => clamp(r.score, 0, 100));
  const base = prior.length ? median(prior) : scores[0];
  return { ex: ex.id, improvement: round1(median(scores.slice(-3)) - base), best: Math.round(Math.max(...scores)), baseline: prior.length > 0 };
}

export function snapshot() {
  const from = weekStart();
  const today = todayKey();
  const summaries = EXERCISES.map((e) => exerciseSummary(e, from)).filter((e) => e !== null);
  // The overall improvement only averages exercises with an earlier level: trying a new exercise (as the daily plan
  // keeps suggesting) must neither pull the average down nor push it up with its first calibration.
  const known = summaries.filter((e) => e.baseline);
  return {
    today,
    // Exercises and Neuro checks finished today: consistency rewards training more, not only more days.
    todayCount: store.data.runs.filter((r) => r.date === today).length + store.data.checks.filter((c) => c.date === today).length,
    relaxed: store.data.settings.relaxed,
    improvement: known.length ? round1(mean(known.map((e) => e.improvement))) : 0,
    exercises: summaries.map(({ ex, improvement, best }) => ({ ex, improvement, best })),
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

/** Reads a board for the player's local week. Relaxed-pace players see, and are ranked in, the relaxed `best` boards. */
export async function fetchBoard(q: BoardQuery): Promise<BoardResult> {
  const params = new URLSearchParams({ metric: q.metric, week: localWeek() });
  if (q.ex) params.set('ex', q.ex);
  if (q.band) params.set('band', q.band);
  if (q.group) params.set('group', q.group);
  if (q.metric === 'best' && store.data.settings.relaxed) params.set('pace', 'relaxed');
  const acc = store.data.board;
  const res = await call('GET', `board?${params}`);
  if (res.status === 401 && acc) {
    forget(acc);
    return fetchBoard({ ...q, group: undefined });
  }
  if (res.status === 403) throw new BoardError('not_member');
  if (!res.ok) throw new BoardError('server');
  return (await res.json()) as BoardResult;
}

// ---- Groups of friends ----

export interface Group {
  id: string;
  name: string;
  code: string;
  members: number;
  /** Created by this player. */
  mine: boolean;
}

/** Turns a failed group request into its error code. */
async function groupFailure(res: Response): Promise<BoardError> {
  const acc = store.data.board;
  if (res.status === 401 && acc) forget(acc);
  const code = ((await res.json().catch(() => ({}))) as { error?: string }).error;
  return new BoardError(code === 'not_found' || code === 'limit' || code === 'full' || code === 'bad_name' ? code : 'server');
}

export async function listGroups(): Promise<Group[]> {
  if (!store.data.board) return [];
  const res = await call('GET', 'groups');
  if (!res.ok) throw await groupFailure(res);
  return ((await res.json()) as { groups: Group[] }).groups;
}

export async function createGroup(name: string): Promise<Group> {
  const res = await call('POST', 'groups', { name });
  if (!res.ok) throw await groupFailure(res);
  return ((await res.json()) as { group: Group }).group;
}

export async function joinGroup(code: string): Promise<Group> {
  const res = await call('POST', 'groups/join', { code });
  if (!res.ok) throw await groupFailure(res);
  return ((await res.json()) as { group: Group }).group;
}

export async function leaveGroup(id: string): Promise<void> {
  const res = await call('DELETE', `groups/${encodeURIComponent(id)}`);
  if (!res.ok) throw await groupFailure(res);
}

export interface GroupMember {
  /** Handle valid only inside this group, used to remove the member. */
  key: string;
  nameCode: number;
  points: number;
  days: number;
  activities: number;
  owner?: true;
  me?: true;
}

/** Everyone in a group with this week's consistency, including those who haven't trained yet. */
export async function listMembers(id: string): Promise<GroupMember[]> {
  const res = await call('GET', `groups/${encodeURIComponent(id)}/members?week=${localWeek()}`);
  if (res.status === 403) throw new BoardError('not_member');
  if (!res.ok) throw await groupFailure(res);
  return ((await res.json()) as { members: GroupMember[] }).members;
}

/** The group's creator removes a member. */
export async function removeMember(id: string, key: string): Promise<void> {
  const res = await call('DELETE', `groups/${encodeURIComponent(id)}/members/${encodeURIComponent(key)}`);
  if (!res.ok) throw await groupFailure(res);
}

/** Name and size of the group behind an invite code, shown before deciding whether to join. */
export async function previewGroup(code: string): Promise<{ name: string; members: number }> {
  const res = await fetch(`${API}groups/preview?code=${encodeURIComponent(code)}`).catch(() => {
    throw new BoardError('offline');
  });
  if (!res.ok) throw await groupFailure(res);
  return (await res.json()) as { name: string; members: number };
}

/** The link that opens the game with an invitation to the group. */
export const inviteLink = (code: string) => `${location.origin}${location.pathname.replace(/[^/]*$/, '')}?group=${code}`;

/**
 * An invite link (?group=CODE) is remembered until the player joins or declines it, even across a reload,
 * and removed from the address bar so it isn't shared again by accident.
 */
export function takeInviteFromUrl() {
  const url = new URL(location.href);
  const code = url.searchParams.get('group')?.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!code) return;
  url.searchParams.delete('group');
  history.replaceState(null, '', url.toString());
  if (code.length !== 10) return;
  store.data.boardInvite = code;
  store.save();
}

export function clearInvite() {
  if (store.data.boardInvite === null) return;
  store.data.boardInvite = null;
  store.save();
}
