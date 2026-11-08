import {
  fail,
  json,
  newTransferCode,
  normalizeTransferCode,
  readBody,
  type Handler,
} from '../../server/board';

const MAX_TRANSFER_BODY = 512 * 1024; // 512 KB
const DAY_MS = 86_400_000;

/**
 * Temporary save transfer for migrating progress across devices.
 * POST: Uploads temporary save data and returns an 8-character code formatted as XXXX-XXXX.
 * GET: Retrieves the temporary save data for a given code.
 * DELETE: Deletes the temporary record once import succeeds, guaranteeing privacy.
 */
export const onRequestPost: Handler = async ({ request, env }) => {
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

  const now = Date.now();
  await db.prepare('INSERT INTO temp_transfers (code, payload, created) VALUES (?, ?, ?)')
    .bind(code, payloadStr, now)
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
