-- Players a group's creator has banned: they can't join again, even with the invite code.
CREATE TABLE group_bans (
  group_id TEXT NOT NULL REFERENCES friend_groups(id) ON DELETE CASCADE,
  player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  banned_at INTEGER NOT NULL,
  PRIMARY KEY (group_id, player_id)
);

CREATE INDEX group_bans_player ON group_bans (player_id);
