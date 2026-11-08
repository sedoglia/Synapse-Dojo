-- Temporary save transfers across devices.
-- Deleted immediately upon successful import, or after 24 hours by nightly cleanup.
CREATE TABLE temp_transfers (
  code TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  created INTEGER NOT NULL
);

CREATE INDEX temp_transfers_created ON temp_transfers (created);
