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
        SELECT story_id
        FROM read_history
        WHERE user_id  = ?        -- 회원
           OR guest_id = ?        -- 비회원
      )
      ORDER BY s.created_at DESC
      `,
      [identifier, identifier], // 파라미터를 두 번!
      (err, rows) => (err ? rej(err) : res(rows))
    );
  });
