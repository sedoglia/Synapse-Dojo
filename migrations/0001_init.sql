-- Opt-in weekly leaderboard. No names, emails or IPs: a random id, the hash of a random secret,
-- a number the app turns into a generated nickname, and an optional self-declared age band.
CREATE TABLE players (
  id TEXT PRIMARY KEY,
  secret_hash TEXT NOT NULL,
  name_code INTEGER NOT NULL,
  age_band TEXT,
  created INTEGER NOT NULL,
  last_seen INTEGER NOT NULL,
  last_submit INTEGER NOT NULL DEFAULT 0
);

-- One row per player, ISO week and exercise; ex = '_all' is the overall row (training days, average improvement).
-- day_mask has one bit per weekday (Monday = bit 0) on which the player sent results.
CREATE TABLE entries (
  player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  week TEXT NOT NULL,
  ex TEXT NOT NULL,
  day_mask INTEGER NOT NULL DEFAULT 0,
  days INTEGER NOT NULL DEFAULT 0,
  improvement REAL NOT NULL DEFAULT 0,
  best INTEGER NOT NULL DEFAULT 0,
  relaxed INTEGER NOT NULL DEFAULT 0,
  updated INTEGER NOT NULL,
  PRIMARY KEY (player_id, week, ex)
);

CREATE INDEX entries_days ON entries (week, ex, days DESC, updated);
CREATE INDEX entries_improvement ON entries (week, ex, improvement DESC, updated);
CREATE INDEX entries_best ON entries (week, ex, best DESC, updated);
CREATE INDEX players_last_seen ON players (last_seen);
