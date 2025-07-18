import fs from "fs";
import path from "path";
import db from "./sqlite.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sql = fs.readFileSync(
  path.resolve(__dirname, "../migrations/01.sql"),
  "utf8"
);
db.exec(sql, (err) => {
  if (err) {
    console.error("❌  Migration failed:", err.message);
    process.exit(1);
  }
  console.log("✅  Migration completed");
  process.exit(0);
});
