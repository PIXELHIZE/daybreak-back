import sqlite3 from "sqlite3";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DB_PATH || resolve(__dirname, "../database.sqlite");
const db = new sqlite3.Database(dbPath, (err) =>
  err
    ? console.error("⚠️ SQLite에 오류가 발생했습니다. 이런...: ", err.message)
    : console.log("✅ DB가 정상 연결되었습니다 예삐!. DB경로: ", dbPath)
);

export default db;
