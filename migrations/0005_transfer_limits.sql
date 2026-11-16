-- Limits on anonymous save uploads, so that nobody can fill the database with them.
-- size: payload size in bytes, summed to cap the space all pending transfers may take.
-- ip_hash: keyed hash of the uploader's network (never the address itself), to cap uploads per hour; it is
-- deleted together with the transfer, on import or by the nightly cleanup.
ALTER TABLE temp_transfers ADD COLUMN size INTEGER NOT NULL DEFAULT 0;
ALTER TABLE temp_transfers ADD COLUMN ip_hash TEXT;

CREATE INDEX temp_transfers_ip ON temp_transfers (ip_hash, created);
