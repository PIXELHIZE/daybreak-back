import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logDir = path.resolve(__dirname, "../logs");
const logFile = path.join(logDir, "error.log");

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

export const guestLogger = (req, _res, next) => {
  if (!req.user && req.headers["x-guest-id"]) {
    const line =
      [
        new Date().toISOString(),
        req.method,
        req.originalUrl,
        `guest:${req.headers["x-guest-id"]}`,
      ].join(" | ") + "\n";

    fs.appendFile(logFile, line, (err) => {
      if (err) console.error("❌  로그 에러:", err);
    });
  }
  next();
};
