import sqlite3 from "sqlite3";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DB_PATH || resolve(__dirname, "../database.sqlite");
const db = new sqlite3.Database(dbPath, (err) =>
  err
    ? console.error("❌  SQLite error:", err.message)
    : console.log("✅  Connected to SQLite →", dbPath)
);

export default db;
