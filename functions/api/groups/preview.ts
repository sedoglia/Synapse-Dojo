import { fail, isCode, json, normalizeCode, type Handler } from '../../../server/board';

/**
 * GET /api/groups/preview?code=… — name and size of the group an invite link points to, so the invite can say
 * where it leads before the person decides to join the leaderboard. Anyone with the code may see this, nobody else.
 */
export const onRequestGet: Handler = async ({ request, env }) => {
  const code = normalizeCode(new URL(request.url).searchParams.get('code'));
  if (!isCode(code)) return fail(404, 'not_found');
  const group = await env.DB.prepare(
    'SELECT g.name, (SELECT COUNT(*) FROM group_members c WHERE c.group_id = g.id) AS members FROM friend_groups g WHERE g.code = ?',
  )
    .bind(code)
    .first<{ name: string; members: number }>();
  return group ? json({ name: group.name, members: group.members }) : fail(404, 'not_found');
};
