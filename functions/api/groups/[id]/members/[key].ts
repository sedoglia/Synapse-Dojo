import { authenticate, fail, json, memberKey, type Handler } from '../../../../../server/board';

/** DELETE /api/groups/<id>/members/<key>: the group's creator removes a member (who can come back with the code). */
export const onRequestDelete: Handler = async ({ request, env, params }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const id = String(params.id);
  if (!/^[0-9a-f-]{36}$/.test(id)) return fail(404, 'not_found');
  const group = await env.DB.prepare('SELECT owner FROM friend_groups WHERE id = ?').bind(id).first<{ owner: string }>();
  if (!group) return fail(404, 'not_found');
  if (group.owner !== player.id) return fail(403, 'not_owner');

  const { results } = await env.DB.prepare('SELECT player_id FROM group_members WHERE group_id = ?').bind(id).all<{ player_id: string }>();
  const keys = await Promise.all(results.map((m) => memberKey(id, m.player_id)));
  const target = results[keys.indexOf(String(params.key))]?.player_id;
  if (!target) return fail(404, 'not_found');
  if (target === player.id) return fail(400, 'use_leave');
  await env.DB.prepare('DELETE FROM group_members WHERE group_id = ? AND player_id = ?').bind(id, target).run();
  return json({ removed: true });
};
