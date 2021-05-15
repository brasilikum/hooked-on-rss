-- Up
CREATE TABLE `msg` (
  received_at INTEGER PRIMARY KEY,
  path TEXT NOT NULL,
  raw_body TEXT NOT NULL,
  raw_headers TEXT NOT NULL
);
CREATE TABLE `user` (
  id INTEGER PRIMARY KEY,
  kind TEXT NOT NULL,
  email TEXT NOT NULL,
  salt TEXT NOT NULL,
  password TEXT NOT NULL,
  path TEXT NOT NULL,
  permission TEXT NOT NULL
);
CREATE TABLE `cookie` (
  cookie_id string PRIMARY KEY,
  user_id TEXT NOT NULL
);
-- Down
DROP TABLE IF EXISTS `msg`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `cookie`;