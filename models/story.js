// models/story.js
import db from "../db/sqlite.js";

export const create = ({ user_id, content }) =>
  new Promise((res, rej) => {
    db.run(
      "INSERT INTO stories (user_id, content) VALUES (?, ?)",
      [user_id, content],
      function (err) {
        err ? rej(err) : res({ id: this.lastID });
      }
    );
  });

export const findById = (id) =>
  new Promise((res, rej) => {
    db.get("SELECT * FROM stories WHERE id = ?", [id], (err, row) =>
      err ? rej(err) : res(row)
    );
  });

export const list = () =>
  new Promise((res, rej) => {
    db.all("SELECT * FROM stories ORDER BY created_at DESC", [], (err, rows) =>
      err ? rej(err) : res(rows)
    );
  });

export const listByUser = (user_id) =>
  new Promise((res, rej) => {
    db.all(
      `
    SELECT s.*,
           (SELECT COUNT(*) FROM reactions WHERE story_id = s.id) AS likes
    FROM stories s
    WHERE user_id = ?
    ORDER BY created_at DESC`,
      [user_id],
      (err, rows) => (err ? rej(err) : res(rows))
    );
  });

export const remove = ({ id, user_id }) =>
  new Promise((res, rej) => {
    db.run(
      "DELETE FROM stories WHERE id=? AND user_id=?",
      [id, user_id],
      function (err) {
        err ? rej(err) : res(this.changes);
      }
    );
  });
