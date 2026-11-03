-- Consistency now rewards how much you train each day, not only on how many days:
-- day_counts holds the activities (exercises and Neuro checks) per weekday, Monday first, as a JSON array;
-- points = 10 per training day + 1 per activity, up to 12 a day.
ALTER TABLE entries ADD COLUMN day_counts TEXT NOT NULL DEFAULT '[0,0,0,0,0,0,0]';
ALTER TABLE entries ADD COLUMN points INTEGER NOT NULL DEFAULT 0;

-- When each value last changed: ties go to whoever got there first, not to whoever sent results least recently.
ALTER TABLE entries ADD COLUMN points_at INTEGER NOT NULL DEFAULT 0;
ALTER TABLE entries ADD COLUMN improvement_at INTEGER NOT NULL DEFAULT 0;
ALTER TABLE entries ADD COLUMN best_at INTEGER NOT NULL DEFAULT 0;

UPDATE entries SET points = days * 11, points_at = updated, improvement_at = updated, best_at = updated;
UPDATE entries SET day_counts = '[' ||
  (day_mask & 1) || ',' || ((day_mask >> 1) & 1) || ',' || ((day_mask >> 2) & 1) || ',' || ((day_mask >> 3) & 1) || ',' ||
  ((day_mask >> 4) & 1) || ',' || ((day_mask >> 5) & 1) || ',' || ((day_mask >> 6) & 1) || ']'
WHERE ex = '_all';

DROP INDEX entries_days;
DROP INDEX entries_improvement;
DROP INDEX entries_best;
CREATE INDEX entries_points ON entries (week, ex, points DESC, points_at);
CREATE INDEX entries_improvement ON entries (week, ex, improvement DESC, improvement_at);
CREATE INDEX entries_best ON entries (week, ex, best DESC, best_at);

-- Private groups of friends: only members see a group and its leaderboard.
-- ("groups" is an SQL keyword, hence friend_groups.)
CREATE TABLE friend_groups (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  owner TEXT NOT NULL,
  created INTEGER NOT NULL
);

CREATE TABLE group_members (
  group_id TEXT NOT NULL REFERENCES friend_groups(id) ON DELETE CASCADE,
  player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  joined INTEGER NOT NULL,
  PRIMARY KEY (group_id, player_id)
);

CREATE INDEX group_members_player ON group_members (player_id);
