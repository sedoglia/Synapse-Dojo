-- The anonymous count of people who trained becomes a rolling total over the last 7 days instead of a calendar
-- week, so it no longer drops to zero every Monday. The app sends one signal at most every 7 days, at an activity,
-- with nothing in it but the date; the server counts signals per day and sums the last 7.
-- net: keyed hash of the sender's network and the day (never the address itself, and not comparable across
-- days), only to cap how many signals one network can add; n: signals counted from it that day.
-- hour_start / hour_n: start of the current clock hour (ms) and signals counted in it, to cap bursts.
-- Rows are deleted after 2 weeks by the nightly cleanup.
CREATE TABLE community_days (
  day TEXT NOT NULL,
  net TEXT NOT NULL,
  n INTEGER NOT NULL DEFAULT 0,
  hour_start INTEGER NOT NULL DEFAULT 0,
  hour_n INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, net)
);

-- The weekly signals can't be turned into days: the count starts again from here (the home screen shows a
-- sentence without a number until it is large enough).
DROP TABLE community_pings;
