CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS reactions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER,
  guest_id   TEXT,
  story_id   INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (story_id) REFERENCES stories(id)
);
CREATE UNIQUE INDEX IF NOT EXISTS reactions_user_unique
  ON reactions (user_id, story_id)
  WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS reactions_guest_unique
  ON reactions (guest_id, story_id)
  WHERE guest_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS read_history (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id  INTEGER,
  guest_id TEXT,
  story_id INTEGER NOT NULL,
  read_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (story_id) REFERENCES stories(id)
);
CREATE UNIQUE INDEX IF NOT EXISTS readhist_user_unique
  ON read_history (user_id, story_id)
  WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS readhist_guest_unique
  ON read_history (guest_id, story_id)
  WHERE guest_id IS NOT NULL;
