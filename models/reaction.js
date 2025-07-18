// models/reaction.js
import db from "../db/sqlite.js";

export const like = ({ story_id, user_id = null, guest_id = null }) =>
  new Promise((res, rej) => {
    db.run(
      "INSERT INTO reactions (user_id, guest_id, story_id) VALUES (?,?,?)",
      [user_id, guest_id, story_id],
      function (err) {
        err ? rej(err) : res({ id: this.lastID });
      }
    );
  });

export const count = (story_id) =>
  new Promise((res, rej) => {
    db.get(
      "SELECT COUNT(*) AS c FROM reactions WHERE story_id = ?",
      [story_id],
      (err, row) => (err ? rej(err) : res(row.c))
    );
  });
