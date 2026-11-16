import {
  fail,
  json,
  newTransferCode,
  normalizeTransferCode,
  readBody,
  sha256,
  type Handler,
} from '../../server/board';

/**
 * Years of daily training fit: a save grows by roughly 100 bytes per exercise played. The stored payload must stay
 * under D1's 2 MB limit for a single value, which is counted in bytes, not characters.
 */
const MAX_TRANSFER_BODY = 1_800_000;
const MAX_PAYLOAD_BYTES = 1_900_000;
const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;

/**
 * Uploads need no account, so two limits keep anyone from filling the database (500 MB on the free plan) with
 * them: all pending transfers together may take at most this many bytes, and each network may upload at most
 * UPLOADS_PER_HOUR saves an hour. A real player moves to a new device now and then and never meets either.
 */
const MAX_PENDING_BYTES = 100_000_000;
const UPLOADS_PER_HOUR = 5;

/** Expands an IPv6 address to its eight groups, or returns null. */
function ipv6Groups(ip: string): string[] | null {
  const [head, tail, extra] = ip.split('::');
  if (extra !== undefined) return null;
  const left = head ? head.split(':') : [];
  const right = tail ? tail.split(':') : [];
  const fill = tail === undefined ? 0 : 8 - left.length - right.length;
  if (fill < 0) return null;
  const groups = [...left, ...Array<string>(fill).fill('0'), ...right];
  return groups.length === 8 ? groups.map((g) => g.toLowerCase().replace(/^0+(?=.)/, '')) : null;
}

/**
 * The uploader's network, hashed with a server secret so the stored value can't be turned back into an address.
 * An IPv6 user gets a whole /64 block, so the limit counts that block rather than the single address.
 */
async function networkHash(request: Request, secret = ''): Promise<string | null> {
  const ip = request.headers.get('CF-Connecting-IP')?.trim();
  if (!ip) return null;
  const v6 = ip.includes(':') ? ipv6Groups(ip) : null;
  const network = v6 ? `${v6.slice(0, 4).join(':')}::/64` : ip;
  return (await sha256(`transfer|${secret}|${network}`)).slice(0, 32);
}

/**
 * Temporary save transfer for migrating progress across devices.
 * POST: Uploads temporary save data and returns an 8-character code formatted as XXXX-XXXX.
 * GET: Retrieves the temporary save data for a given code.
 * DELETE: Deletes the temporary record once import succeeds, guaranteeing privacy.
 */
export const onRequestPost: Handler = async ({ request, env }) => {
  // Limits first, so that a refused upload costs neither reading its body nor parsing it.
  const now = Date.now();
  const ipHash = await networkHash(request, env.TURNSTILE_SECRET);
  const usage = await env.DB.prepare(
    `SELECT (SELECT COALESCE(SUM(size), 0) FROM temp_transfers WHERE created > ?1) AS pending,
            (SELECT COUNT(*) FROM temp_transfers WHERE ip_hash = ?2 AND created > ?3) AS recent`,
  )
    .bind(now - DAY_MS, ipHash, now - HOUR_MS)
    .first<{ pending: number; recent: number }>();
  if (ipHash && (usage?.recent ?? 0) >= UPLOADS_PER_HOUR) {
    return json({ error: 'too_many' }, 429, { 'Retry-After': '3600' });
  }
  if ((usage?.pending ?? 0) >= MAX_PENDING_BYTES) {
    return json({ error: 'busy' }, 503, { 'Retry-After': '3600' });
  }

  const body = await readBody(request, MAX_TRANSFER_BODY);
  if (!body) return fail(400, 'bad_body');

  let payloadStr: string;
  if (typeof body.payload === 'string') {
    payloadStr = body.payload;
  } else if (body.app || body.data) {
    payloadStr = JSON.stringify(body);
  } else {
    return fail(400, 'invalid_payload');
  }

  const size = new TextEncoder().encode(payloadStr).length;
  if (size > MAX_PAYLOAD_BYTES) return fail(413, 'too_large');

  // Quick sanity check: must parse as valid JSON and resemble a Synapse Dojo save
  try {
    const parsed: unknown = JSON.parse(payloadStr);
    const d =
      typeof parsed === 'object' &&
      parsed !== null &&
      ((parsed as Record<string, unknown>).app === 'synapse-dojo' || (parsed as Record<string, unknown>).app === 'synapse-gym')
        ? (parsed as { data: unknown }).data
        : parsed;
    if (!d || typeof d !== 'object' || !Array.isArray((d as { runs?: unknown }).runs) || typeof (d as { name?: unknown }).name !== 'string') {
      return fail(400, 'invalid_save_data');
    }
  } catch {
    return fail(400, 'invalid_json');
  }

  const db = env.DB;
  let code = '';
  for (let i = 0; i < 5; i++) {
    const candidate = newTransferCode();
    const exists = await db.prepare('SELECT 1 FROM temp_transfers WHERE code = ?').bind(candidate).first();
    if (!exists) {
      code = candidate;
      break;
    }
  }
  if (!code) return fail(500, 'code_generation_failed');

  await db.prepare('INSERT INTO temp_transfers (code, payload, created, size, ip_hash) VALUES (?, ?, ?, ?, ?)')
    .bind(code, payloadStr, now, size, ipHash)
    .run();

  return json({ code }, 201);
};

export const onRequestGet: Handler = async ({ request, env }) => {
  const url = new URL(request.url);
  const code = normalizeTransferCode(url.searchParams.get('code'));
  if (!code) return fail(400, 'bad_code');

  const row = await env.DB.prepare('SELECT payload, created FROM temp_transfers WHERE code = ?')
    .bind(code)
    .first<{ payload: string; created: number }>();

  if (!row) return fail(404, 'not_found');

  if (Date.now() - row.created > DAY_MS) {
    await env.DB.prepare('DELETE FROM temp_transfers WHERE code = ?').bind(code).run();
    return fail(404, 'expired');
  }

  return json({ payload: row.payload });
};

export const onRequestDelete: Handler = async ({ request, env }) => {
  const url = new URL(request.url);
  let code = normalizeTransferCode(url.searchParams.get('code'));
  if (!code) {
    const body = await readBody(request, 1024);
    if (body?.code) code = normalizeTransferCode(body.code);
  }
  if (!code) return fail(400, 'bad_code');

  await env.DB.prepare('DELETE FROM temp_transfers WHERE code = ?').bind(code).run();
  return json({ deleted: true });
};
