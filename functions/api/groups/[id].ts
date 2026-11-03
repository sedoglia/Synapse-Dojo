import { DROP_EMPTY_GROUPS, authenticate, fail, json, type Handler } from '../../../server/board';

/** DELETE /api/groups/<id>: leaves a group; a group left without members is deleted. */
export const onRequestDelete: Handler = async ({ request, env, params }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const id = String(params.id);
  if (!/^[0-9a-f-]{36}$/.test(id)) return fail(404, 'not_found');
  await env.DB.batch([
    env.DB.prepare('DELETE FROM group_members WHERE group_id = ? AND player_id = ?').bind(id, player.id),
    env.DB.prepare(DROP_EMPTY_GROUPS),
  ]);
  return json({ left: true });
};
