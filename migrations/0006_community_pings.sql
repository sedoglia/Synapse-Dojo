-- Anonymous weekly count of people who trained, members of the leaderboard or not (players can turn it off).
-- The app sends one signal a week, at the first activity, with nothing in it but the date.
-- net: keyed hash of the sender's network and the week (never the address itself, and not comparable across
-- weeks), only to cap how many signals one network can add; n: signals counted from it this week.
-- hour_start / hour_n: start of the current clock hour (ms) and signals counted in it, to cap bursts.
-- Rows are deleted with the leaderboard's old weeks by the nightly cleanup.
CREATE TABLE community_pings (
  week TEXT NOT NULL,
  net TEXT NOT NULL,
  n INTEGER NOT NULL DEFAULT 0,
  hour_start INTEGER NOT NULL DEFAULT 0,
  hour_n INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (week, net)
);
