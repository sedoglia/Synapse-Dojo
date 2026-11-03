import { AGE_BANDS, authenticate, fail, json, randomNameCode, readBody, type Handler } from '../../server/board';

export const onRequestGet: Handler = async ({ request, env }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  await env.DB.prepare('UPDATE players SET last_seen = ? WHERE id = ?').bind(Date.now(), player.id).run();
  return json({ nameCode: player.name_code, ageBand: player.age_band });
};

/** { ageBand?: band | null, rename?: true } — a new nickname is drawn at random, never chosen. */
export const onRequestPatch: Handler = async ({ request, env }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const body = await readBody(request);
  if (!body) return fail(400, 'bad_body');
  let { age_band: ageBand, name_code: nameCode } = player;
  if ('ageBand' in body) {
    if (body.ageBand !== null && !AGE_BANDS.includes(body.ageBand as string)) return fail(400, 'bad_age_band');
    ageBand = body.ageBand as string | null;
  }
  if (body.rename === true) nameCode = randomNameCode();
  await env.DB.prepare('UPDATE players SET age_band = ?, name_code = ?, last_seen = ? WHERE id = ?')
    .bind(ageBand, nameCode, Date.now(), player.id)
    .run();
  return json({ nameCode, ageBand });
};

/** Leaves the board: everything about the player is deleted at once. */
export const onRequestDelete: Handler = async ({ request, env }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  await env.DB.batch([
    env.DB.prepare('DELETE FROM entries WHERE player_id = ?').bind(player.id),
    env.DB.prepare('DELETE FROM players WHERE id = ?').bind(player.id),
  ]);
  return json({ deleted: true });
};
