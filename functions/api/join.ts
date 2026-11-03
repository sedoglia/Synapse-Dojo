import { AGE_BANDS, fail, humanCheck, json, randomNameCode, randomSecret, readBody, sha256, type Handler } from '../../server/board';

/** Opt-in: creates an anonymous player. The secret is returned once and only its hash is stored. */
export const onRequestPost: Handler = async ({ request, env }) => {
  const body = await readBody(request);
  if (!body) return fail(400, 'bad_body');
  const ageBand = body.ageBand ?? null;
  if (ageBand !== null && !AGE_BANDS.includes(ageBand as string)) return fail(400, 'bad_age_band');
  if (!(await humanCheck(request, env, body.turnstile))) return fail(403, 'human_check');

  const id = crypto.randomUUID();
  const secret = randomSecret();
  const nameCode = randomNameCode();
  const now = Date.now();
  await env.DB.prepare('INSERT INTO players (id, secret_hash, name_code, age_band, created, last_seen) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(id, await sha256(secret), nameCode, ageBand, now, now)
    .run();
  return json({ id, secret, nameCode, ageBand }, 201);
};
