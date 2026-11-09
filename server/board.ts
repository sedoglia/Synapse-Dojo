// Shared code for the leaderboard API in functions/api/ (kept outside functions/ so it isn't a route).

export interface Env {
  DB: D1Database;
  /** Turnstile secret key; without it, joining works only on localhost. */
  TURNSTILE_SECRET?: string;
}

export type Handler = PagesFunction<Env>;

export interface Player {
  id: string;
  name_code: number;
  age_band: string | null;
  last_submit: number;
}

export const AGE_BANDS = ['u30', '30-49', '50-64', '65-74', '75+'];
/** Overall row in `entries`; every other `ex` is an exercise id. */
export const ALL = '_all';
/** Letters and digits, starting with a letter: `game2048` is an exercise id too. */
const EX_ID = /^[a-zA-Z][a-zA-Z0-9]{0,23}$/;
export const isExId = (v: unknown): v is string => typeof v === 'string' && (v === ALL || EX_ID.test(v));

/** Seconds between two result uploads from the same player. */
export const SUBMIT_INTERVAL = 30;
const KEEP_WEEKS = 2;
const KEEP_PLAYERS_DAYS = 30;
const KEEP_GHOST_DAYS = 7;
export const KEEP_TRANSFER_DAYS = 1;
const MAX_BODY = 8 * 1024;
const DAY = 86_400_000;

export const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

export const fail = (status: number, error: string) => json({ error }, status);

/** Parses a small JSON object body, or returns null. */
export async function readBody(request: Request, max = MAX_BODY): Promise<Record<string, unknown> | null> {
  if (Number(request.headers.get('Content-Length') ?? 0) > max) return null;
  const text = await request.text();
  if (text.length > max) return null;
  try {
    const v: unknown = JSON.parse(text);
    return typeof v === 'object' && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
export const sha256 = async (s: string) => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));

export function randomSecret(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** A random 31-bit number; the app turns it into an adjective + animal + number nickname in each language. */
export const randomNameCode = () => crypto.getRandomValues(new Uint32Array(1))[0] >>> 1;

/** The player from `Authorization: Bearer <id>.<secret>`, or null. */
export async function authenticate(request: Request, env: Env): Promise<Player | null> {
  const m = /^Bearer ([0-9a-f-]{36})\.([\w-]{20,100})$/.exec(request.headers.get('Authorization') ?? '');
  if (!m) return null;
  const row = await env.DB.prepare('SELECT id, secret_hash, name_code, age_band, last_submit FROM players WHERE id = ?')
    .bind(m[1])
    .first<Player & { secret_hash: string }>();
  if (!row || row.secret_hash !== (await sha256(m[2]))) return null;
  return { id: row.id, name_code: row.name_code, age_band: row.age_band, last_submit: row.last_submit };
}

/** Checks a Turnstile token; skipped on localhost when no secret is configured. */
export async function humanCheck(request: Request, env: Env, token: unknown): Promise<boolean> {
  if (!env.TURNSTILE_SECRET) return ['localhost', '127.0.0.1'].includes(new URL(request.url).hostname);
  if (typeof token !== 'string' || token.length > 2048) return false;
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    return ((await res.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

/** ISO 8601 week of a UTC date, e.g. "2026-W45" (Monday to Sunday). */
export function isoWeek(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7)); // Thursday of the same week
  const week = Math.ceil(((d.getTime() - Date.UTC(d.getUTCFullYear(), 0, 1)) / DAY + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

/**
 * The player's local date, accepted only if it is within a day of the server's (time zones run from
 * UTC−12 to UTC+14), so training days can only be added on the day they happen.
 * Returns its ISO week and weekday (0 = Monday), or null.
 */
export function localDay(value: unknown, now = new Date()): { week: string; day: number } | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || dayKey(d) !== value) return null;
  const today = new Date(`${dayKey(now)}T00:00:00Z`);
  if (Math.abs(d.getTime() - today.getTime()) > DAY) return null;
  return { week: isoWeek(d), day: (d.getUTCDay() + 6) % 7 };
}

/**
 * Consistency points: 10 for each training day plus 1 for each activity (exercise or Neuro check), counting up to
 * 12 a day (three workouts). Training more helps, but spreading it over the week helps more: seven light days
 * beat three heavy ones, as spaced practice beats massed practice.
 */
export const DAY_POINTS = 10;
export const DAY_CAP = 12;
export const consistencyPoints = (counts: number[]) => counts.reduce((sum, c) => sum + (c > 0 ? DAY_POINTS + Math.min(c, DAY_CAP) : 0), 0);

/** The seven per-day activity counts stored for a week (Monday first). */
export function parseCounts(value: unknown): number[] {
  try {
    const v: unknown = JSON.parse(String(value));
    if (Array.isArray(v) && v.length === 7 && v.every((n) => Number.isInteger(n) && n >= 0)) return v as number[];
  } catch {
    /* fall through */
  }
  return [0, 0, 0, 0, 0, 0, 0];
}

/** Weeks the board can be read for: the current one (with a day of slack either side) and the previous. */
export function readableWeek(value: unknown, now = new Date()): string | null {
  if (value === undefined || value === null || value === '') return isoWeek(now);
  if (typeof value !== 'string' || !/^\d{4}-W\d{2}$/.test(value)) return null;
  const ok = [-7, -1, 0, 1].map((days) => isoWeek(new Date(now.getTime() + days * DAY)));
  return ok.includes(value) ? value : null;
}

/** Groups left without members are deleted together with their name. */
export const DROP_EMPTY_GROUPS = 'DELETE FROM friend_groups WHERE id NOT IN (SELECT group_id FROM group_members)';

/** Bans left without a group are deleted explicitly, so the cleanup never depends on foreign keys being enforced. */
export const DROP_ORPHAN_BANS = 'DELETE FROM group_bans WHERE group_id NOT IN (SELECT id FROM friend_groups)';

/** A group whose creator is gone passes to its oldest member, so someone can always manage it. */
export const REASSIGN_OWNERS = `UPDATE friend_groups SET owner = COALESCE(
    (SELECT m.player_id FROM group_members m WHERE m.group_id = friend_groups.id ORDER BY m.joined, m.player_id LIMIT 1), owner)
  WHERE NOT EXISTS (SELECT 1 FROM group_members o WHERE o.group_id = friend_groups.id AND o.player_id = friend_groups.owner)`;

/** Everything the server keeps about a player: results, group memberships and bans, the player itself. */
export const deletePlayer = (db: D1Database, id: string) => [
  db.prepare('DELETE FROM entries WHERE player_id = ?').bind(id),
  db.prepare('DELETE FROM group_members WHERE player_id = ?').bind(id),
  db.prepare('DELETE FROM group_bans WHERE player_id = ?').bind(id),
  db.prepare('DELETE FROM players WHERE id = ?').bind(id),
  db.prepare(REASSIGN_OWNERS),
  db.prepare(DROP_EMPTY_GROUPS),
  db.prepare(DROP_ORPHAN_BANS),
];

/**
 * Drops old weeks and players who stopped using the board, as the privacy notice promises.
 * Run every night by the cron Worker in cleanup/ (Pages has no cron). Returns the rows deleted, for its log.
 */
export async function cleanUp(db: D1Database, now = new Date()) {
  const oldWeek = isoWeek(new Date(now.getTime() - KEEP_WEEKS * 7 * DAY));
  const idle = now.getTime() - KEEP_PLAYERS_DAYS * DAY;
  const idleGhost = now.getTime() - KEEP_GHOST_DAYS * DAY;
  const transferCutoff = now.getTime() - KEEP_TRANSFER_DAYS * DAY;
  const idlePlayers =
    'SELECT id FROM players WHERE last_seen < ?1 OR (last_submit = 0 AND last_seen < ?2 AND id NOT IN (SELECT player_id FROM group_members))';
  const [weeks, idleEntries, , bansIdle, players, , groups, bansOrphan, transfers] = await db.batch([
    db.prepare('DELETE FROM entries WHERE week < ?').bind(oldWeek),
    db.prepare(`DELETE FROM entries WHERE player_id IN (${idlePlayers})`).bind(idle, idleGhost),
    db.prepare(`DELETE FROM group_members WHERE player_id IN (${idlePlayers})`).bind(idle, idleGhost),
    db.prepare(`DELETE FROM group_bans WHERE player_id IN (${idlePlayers})`).bind(idle, idleGhost),
    db.prepare(`DELETE FROM players WHERE id IN (${idlePlayers})`).bind(idle, idleGhost),
    db.prepare(REASSIGN_OWNERS),
    db.prepare(DROP_EMPTY_GROUPS),
    db.prepare(DROP_ORPHAN_BANS),
    db.prepare('DELETE FROM temp_transfers WHERE created < ?').bind(transferCutoff),
  ]);
  return {
    entries: (weeks.meta.changes ?? 0) + (idleEntries.meta.changes ?? 0),
    players: players.meta.changes ?? 0,
    groups: groups.meta.changes ?? 0,
    bans: (bansIdle.meta.changes ?? 0) + (bansOrphan.meta.changes ?? 0),
    transfers: transfers.meta.changes ?? 0,
  };
}

// ---- Groups ----

/** Invite codes: 10 characters without look-alikes (0/O, 1/I/L), about 50 bits, so they can't be guessed. */
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const MAX_GROUPS = 10;
export const MAX_MEMBERS = 100;

/**
 * Generates an invite code uniformly at random without modulo bias.
 * Since CODE_CHARS has 31 characters, taking 5 bits (0..31) and rejecting index 31
 * guarantees each character has an exact 1/31 probability without using the modulo operator.
 */
export function newCode(): string {
  let code = '';
  const buf = new Uint8Array(16);
  while (code.length < 10) {
    crypto.getRandomValues(buf);
    for (let i = 0; i < buf.length && code.length < 10; i++) {
      const idx = buf[i] & 0x1f;
      if (idx < CODE_CHARS.length) code += CODE_CHARS[idx];
    }
  }
  return code;
}
/** Accepts codes typed with spaces, dashes or lowercase letters. */
export const normalizeCode = (v: unknown) => (typeof v === 'string' ? v.toUpperCase().replace(/[^A-Z0-9]/g, '') : '');
export const isCode = (v: string) => v.length === 10 && [...v].every((c) => CODE_CHARS.includes(c));

/** Generates an 8-character transfer code formatted as XXXX-XXXX. */
export function newTransferCode(): string {
  let code = '';
  const buf = new Uint8Array(16);
  while (code.length < 8) {
    crypto.getRandomValues(buf);
    for (let i = 0; i < buf.length && code.length < 8; i++) {
      const idx = buf[i] & 0x1f;
      if (idx < CODE_CHARS.length) code += CODE_CHARS[idx];
    }
  }
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

/** Accepts 8-character transfer codes typed with spaces, dashes or lowercase letters, returning XXXX-XXXX or empty. */
export function normalizeTransferCode(v: unknown): string {
  if (typeof v !== 'string') return '';
  const clean = v.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (clean.length !== 8 || ![...clean].every((c) => CODE_CHARS.includes(c))) return '';
  return `${clean.slice(0, 4)}-${clean.slice(4)}`;
}

/** A group name: 1–30 characters, single spaces, no control characters. Only members ever see it. */
export function cleanGroupName(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const name = v.replace(/[\p{Cc}\p{Cf}]/gu, '').replace(/\s+/g, ' ').trim();
  return [...name].length >= 1 && [...name].length <= 30 ? name : null;
}

/** A member's handle inside one group: it can't be traced to their id or matched across groups. */
export const memberKey = async (groupId: string, playerId: string) => (await sha256(`member:${groupId}:${playerId}`)).slice(0, 32);

export const groupCount = async (db: D1Database, playerId: string) =>
  (await db.prepare('SELECT COUNT(*) AS n FROM group_members WHERE player_id = ?').bind(playerId).first<{ n: number }>())?.n ?? 0;

export const isMember = async (db: D1Database, groupId: string, playerId: string) =>
  !!(await db.prepare('SELECT 1 AS ok FROM group_members WHERE group_id = ? AND player_id = ?').bind(groupId, playerId).first());
