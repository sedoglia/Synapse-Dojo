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
const EX_ID = /^[a-zA-Z]{1,24}$/;
export const isExId = (v: unknown): v is string => typeof v === 'string' && (v === ALL || EX_ID.test(v));

/** Seconds between two result uploads from the same player. */
export const SUBMIT_INTERVAL = 30;
const KEEP_WEEKS = 8;
const KEEP_PLAYERS_DAYS = 90;
const MAX_BODY = 8 * 1024;
const DAY = 86_400_000;

export const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

export const fail = (status: number, error: string) => json({ error }, status);

/** Parses a small JSON object body, or returns null. */
export async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  if (Number(request.headers.get('Content-Length') ?? 0) > MAX_BODY) return null;
  const text = await request.text();
  if (text.length > MAX_BODY) return null;
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
 * Returns its ISO week and weekday bit, or null.
 */
export function localDay(value: unknown, now = new Date()): { week: string; bit: number } | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || dayKey(d) !== value) return null;
  const today = new Date(`${dayKey(now)}T00:00:00Z`);
  if (Math.abs(d.getTime() - today.getTime()) > DAY) return null;
  return { week: isoWeek(d), bit: 1 << ((d.getUTCDay() + 6) % 7) };
}

/** Weeks the board can be read for: the current one (with a day of slack either side) and the previous. */
export function readableWeek(value: unknown, now = new Date()): string | null {
  if (value === undefined || value === null || value === '') return isoWeek(now);
  if (typeof value !== 'string' || !/^\d{4}-W\d{2}$/.test(value)) return null;
  const ok = [-7, -1, 0, 1].map((days) => isoWeek(new Date(now.getTime() + days * DAY)));
  return ok.includes(value) ? value : null;
}

export const popcount = (n: number) => {
  let c = 0;
  for (; n; n &= n - 1) c++;
  return c;
};

/** Now and then, drop old weeks and players who stopped using the board (no cron on Pages). */
export async function maybeCleanUp(env: Env, now = new Date()): Promise<void> {
  if (crypto.getRandomValues(new Uint8Array(1))[0] >= 5) return; // about 1 call in 50
  const oldWeek = isoWeek(new Date(now.getTime() - KEEP_WEEKS * 7 * DAY));
  const idle = now.getTime() - KEEP_PLAYERS_DAYS * DAY;
  await env.DB.batch([
    env.DB.prepare('DELETE FROM entries WHERE week < ?').bind(oldWeek),
    env.DB.prepare('DELETE FROM entries WHERE player_id IN (SELECT id FROM players WHERE last_seen < ?)').bind(idle),
    env.DB.prepare('DELETE FROM players WHERE last_seen < ?').bind(idle),
  ]);
}
