import { authenticate, fail, json, newCode, type Handler } from '../../../../server/board';

/**
 * POST /api/groups/<id>/code: the group's creator replaces the invite code. The old code and links stop working at
 * once, which also keeps out anyone who knows them under a new anonymous identity; members stay in the group.
 */
export const onRequestPost: Handler = async ({ request, env, params }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const id = String(params.id);
  if (!/^[0-9a-f-]{36}$/.test(id)) return fail(404, 'not_found');
  const group = await env.DB.prepare('SELECT owner FROM friend_groups WHERE id = ?').bind(id).first<{ owner: string }>();
  if (!group) return fail(404, 'not_found');
  if (group.owner !== player.id) return fail(403, 'not_owner');

  // A clash between two random 50-bit codes is practically impossible; one retry covers it anyway.
  for (let attempt = 0; ; attempt++) {
    const code = newCode();
    try {
      await env.DB.prepare('UPDATE friend_groups SET code = ? WHERE id = ?').bind(code, id).run();
      return json({ code });
    } catch (e) {
      if (attempt > 0 || !String(e).includes('UNIQUE')) throw e;
    }
  }
};
