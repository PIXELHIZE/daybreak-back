// src/utils/logger.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import winston from "winston";
import "winston-daily-rotate-file";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = process.env.LOG_DIR || path.resolve(__dirname, "../../logs");
fs.mkdirSync(logDir, { recursive: true });

const formatter = winston.format.printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp} [${level}] ${stack || message}`
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    winston.format.errors({ stack: true }),
    formatter
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      dirname: logDir,
      filename: "app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
  ],
});
