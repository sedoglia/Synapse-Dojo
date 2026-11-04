import { ALL, DAY_CAP, authenticate, fail, isMember, json, memberKey, parseCounts, readableWeek, type Handler } from '../../../../../server/board';

interface MemberRow {
  player_id: string;
  name_code: number;
  points: number | null;
  days: number | null;
  day_counts: string | null;
}

/**
 * GET /api/groups/<id>/members?week=YYYY-Www: who is in the group, for its members only, oldest member first.
 * Everyone is listed, also those who haven't trained this week and so aren't on the group's leaderboard.
 * Players are identified by a key valid only inside this group, never by their id.
 */
export const onRequestGet: Handler = async ({ request, env, params }) => {
  const player = await authenticate(request, env);
  if (!player) return fail(401, 'unauthorized');
  const id = String(params.id);
  if (!/^[0-9a-f-]{36}$/.test(id) || !(await isMember(env.DB, id, player.id))) return fail(403, 'not_member');
  const week = readableWeek(new URL(request.url).searchParams.get('week'));
  if (!week) return fail(400, 'bad_week');

  const owner = await env.DB.prepare('SELECT owner FROM friend_groups WHERE id = ?').bind(id).first<{ owner: string }>();
  const { results } = await env.DB.prepare(
    `SELECT m.player_id, p.name_code, e.points, e.days, e.day_counts
     FROM group_members m
     JOIN players p ON p.id = m.player_id
     LEFT JOIN entries e ON e.player_id = m.player_id AND e.week = ? AND e.ex = ?
     WHERE m.group_id = ? ORDER BY m.joined, m.player_id`,
  )
    .bind(week, ALL, id)
    .all<MemberRow>();

  const members = await Promise.all(
    results.map(async (m) => ({
      key: await memberKey(id, m.player_id),
      nameCode: m.name_code,
      points: m.points ?? 0,
      days: m.days ?? 0,
      activities: parseCounts(m.day_counts).reduce((a, c) => a + Math.min(c, DAY_CAP), 0),
      ...(m.player_id === owner?.owner ? { owner: true } : {}),
      ...(m.player_id === player.id ? { me: true } : {}),
    })),
  );
  if (owner?.owner !== player.id) return json({ members, banned: [] });

  // Only the creator sees who is banned, to be able to let them back in.
  const bans = await env.DB.prepare(
    `SELECT b.player_id, p.name_code FROM group_bans b JOIN players p ON p.id = b.player_id WHERE b.group_id = ? ORDER BY b.banned_at`,
  )
    .bind(id)
    .all<{ player_id: string; name_code: number }>();
  const banned = await Promise.all(bans.results.map(async (b) => ({ key: await memberKey(id, b.player_id), nameCode: b.name_code })));
  return json({ members, banned });
};
