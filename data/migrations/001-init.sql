-- Up
CREATE TABLE `msg` (
  received_at INTEGER PRIMARY KEY,
  path TEXT NOT NULL,
  raw_body TEXT NOT NULL,
  raw_headers TEXT NOT NULL
);
-- Down
DROP TABLE IF EXISTS `msg`;