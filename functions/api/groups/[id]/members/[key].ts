import { authenticate, fail, json, memberKey, type Handler } from '../../../../../server/board';

/**
 * DELETE /api/groups/<id>/members/<key>[?ban=1]: the group's creator removes a member, who can come back with the
 * code, or with ban=1 also bans them, so that the code no longer lets them in.
 */
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
  const ban = new URL(request.url).searchParams.get('ban') === '1';
  await env.DB.batch([
    env.DB.prepare('DELETE FROM group_members WHERE group_id = ? AND player_id = ?').bind(id, target),
    ...(ban ? [env.DB.prepare('INSERT OR REPLACE INTO group_bans (group_id, player_id, banned_at) VALUES (?, ?, ?)').bind(id, target, Date.now())] : []),
  ]);
  return json({ removed: true, banned: ban });
};
