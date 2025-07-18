// models/user.js
import db from "../db/sqlite.js";
import bcrypt from "bcrypt";

export const create = async ({ email, password }) => {
  const hash = await bcrypt.hash(password, 10);
  return new Promise((res, rej) => {
    db.run(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hash],
      function (err) {
        err ? rej(err) : res({ id: this.lastID, email });
      }
    );
  });
};

export const findByEmail = (email) =>
  new Promise((res, rej) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) =>
      err ? rej(err) : res(row)
    );
  });

export const comparePassword = (password, hash) =>
  bcrypt.compare(password, hash);

export const findById = (id) =>
  new Promise((res, rej) => {
    db.get(
      "SELECT id, email, created_at FROM users WHERE id = ?",
      [id],
      (err, row) => (err ? rej(err) : res(row))
    );
  });
