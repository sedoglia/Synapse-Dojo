import { MAX_GROUPS, MAX_MEMBERS, authenticate, fail, groupCount, isCode, isMember, json, normalizeCode, readBody, type Handler } from '../../../server/board';

/** Joins a group with its invite code { code }. Joining a group you are already in just returns it. */
export const onRequestPost: Handler = async ({ request, env }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const body = await readBody(request);
  const code = normalizeCode(body?.code);
  if (!isCode(code)) return fail(404, 'not_found');
  const db = env.DB;
  const group = await db
    .prepare('SELECT g.id, g.name, g.code, g.owner, (SELECT COUNT(*) FROM group_members c WHERE c.group_id = g.id) AS members FROM friend_groups g WHERE g.code = ?')
    .bind(code)
    .first<{ id: string; name: string; code: string; owner: string; members: number }>();
  if (!group) return fail(404, 'not_found');

  let members = group.members;
  if (!(await isMember(db, group.id, player.id))) {
    if (members >= MAX_MEMBERS) return fail(409, 'full');
    if ((await groupCount(db, player.id)) >= MAX_GROUPS) return fail(409, 'limit');
    await db.prepare('INSERT INTO group_members (group_id, player_id, joined) VALUES (?, ?, ?)').bind(group.id, player.id, Date.now()).run();
    members++;
  }
  return json({ group: { id: group.id, name: group.name, code: group.code, members, mine: group.owner === player.id } });
};
