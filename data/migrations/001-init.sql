-- Up
CREATE TABLE `msg` (
  received_at INTEGER PRIMARY KEY,
  path TEXT NOT NULL,
  raw_json TEXT NOT NULL
);
-- Down
DROP TABLE IF EXISTS `msg`;