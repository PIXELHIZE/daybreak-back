/* Users */
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

/* Stories */
CREATE TABLE IF NOT EXISTS stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/* Reactions */
CREATE TABLE IF NOT EXISTS reactions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER,
  guest_id   TEXT,
  story_id   INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (story_id) REFERENCES stories(id)
);
/* ① 회원이 누른 like 중복 방지 */
CREATE UNIQUE INDEX IF NOT EXISTS reactions_user_unique
  ON reactions (user_id, story_id)
  WHERE user_id IS NOT NULL;
/* ② 비회원(guest_id) 가 누른 like 중복 방지 */
CREATE UNIQUE INDEX IF NOT EXISTS reactions_guest_unique
  ON reactions (guest_id, story_id)
  WHERE guest_id IS NOT NULL;

/* Read History */
CREATE TABLE IF NOT EXISTS read_history (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id  INTEGER,
  guest_id TEXT,
  story_id INTEGER NOT NULL,
  read_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (story_id) REFERENCES stories(id)
);
/* ①, ② 동일한 방식으로 중복 방지 */
CREATE UNIQUE INDEX IF NOT EXISTS readhist_user_unique
  ON read_history (user_id, story_id)
  WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS readhist_guest_unique
  ON read_history (guest_id, story_id)
  WHERE guest_id IS NOT NULL;
