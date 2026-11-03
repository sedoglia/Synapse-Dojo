import { MAX_GROUPS, authenticate, cleanGroupName, fail, groupCount, json, newCode, readBody, type Handler } from '../../../server/board';

interface GroupRow {
  id: string;
  name: string;
  code: string;
  owner: string;
  members: number;
}

const out = (g: GroupRow, playerId: string) => ({ id: g.id, name: g.name, code: g.code, members: g.members, mine: g.owner === playerId });

/** The caller's groups, in the order they joined them. */
export const onRequestGet: Handler = async ({ request, env }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const { results } = await env.DB.prepare(
    `SELECT g.id, g.name, g.code, g.owner, (SELECT COUNT(*) FROM group_members c WHERE c.group_id = g.id) AS members
     FROM friend_groups g JOIN group_members m ON m.group_id = g.id WHERE m.player_id = ? ORDER BY m.joined`,
  )
    .bind(player.id)
    .all<GroupRow>();
  return json({ groups: results.map((g) => out(g, player.id)) });
};

/** Creates a group { name } with the caller as its first member. */
export const onRequestPost: Handler = async ({ request, env }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const body = await readBody(request);
  const name = cleanGroupName(body?.name);
  if (!name) return fail(400, 'bad_name');
  if ((await groupCount(env.DB, player.id)) >= MAX_GROUPS) return fail(409, 'limit');

  const id = crypto.randomUUID();
  const now = Date.now();
  // A clash between two random 50-bit codes is practically impossible; one retry covers it anyway.
  for (let attempt = 0; ; attempt++) {
    const code = newCode();
    try {
      await env.DB.batch([
        env.DB.prepare('INSERT INTO friend_groups (id, code, name, owner, created) VALUES (?, ?, ?, ?, ?)').bind(id, code, name, player.id, now),
        env.DB.prepare('INSERT INTO group_members (group_id, player_id, joined) VALUES (?, ?, ?)').bind(id, player.id, now),
      ]);
      return json({ group: out({ id, name, code, owner: player.id, members: 1 }, player.id) }, 201);
    } catch (e) {
      if (attempt > 0 || !String(e).includes('UNIQUE')) throw e;
    }
  }
};
