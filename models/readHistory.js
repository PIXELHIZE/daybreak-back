// models/readHistory.js
import db from "../db/sqlite.js";

export const markRead = ({ story_id, user_id = null, guest_id = null }) =>
  new Promise((res, rej) => {
    db.run(
      "INSERT OR IGNORE INTO read_history (user_id, guest_id, story_id) VALUES (?,?,?)",
      [user_id, guest_id, story_id],
      (err) => (err ? rej(err) : res(true))
    );
  });

export const unreadStoriesFor = (identifier) =>
  new Promise((res, rej) => {
    db.all(
      `
    SELECT s.*
    FROM stories s
    WHERE s.id NOT IN (
      SELECT story_id FROM read_history
      WHERE COALESCE(user_id, guest_id) = ?
    )
  `,
      [identifier],
      (err, rows) => (err ? rej(err) : res(rows))
    );
  });
