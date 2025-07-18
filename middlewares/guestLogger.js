// middlewares/guestLogger.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 로그 파일 경로 (루트/logs/error.log)
const logDir = path.resolve(__dirname, "../logs");
const logFile = path.join(logDir, "error.log");

// 디렉터리 없으면 생성
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

export const guestLogger = (req, _res, next) => {
  // JWT 없고 Guest-ID 있을 때만 기록
  if (!req.user && req.headers["x-guest-id"]) {
    const line =
      [
        new Date().toISOString(),
        req.method,
        req.originalUrl,
        `guest:${req.headers["x-guest-id"]}`,
      ].join(" | ") + "\n";

    fs.appendFile(logFile, line, (err) => {
      if (err) console.error("❌  guestLogger write error:", err);
    });
  }
  next();
};
