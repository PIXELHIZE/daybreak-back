import express from "express";
import authRoutes from "./routes/auth.js";
import storyRoutes from "./routes/story.js";
import reactionRoutes from "./routes/reaction.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/user.js";
import morgan from "morgan";
import { logger } from "./utils/logger.js";
import readRoutes from "./routes/read.js";
import { guestLogger } from "./middlewares/guestLogger.js";
import cors from "cors";

const app = express();
app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Guest-Id"],
    credentials: false,
  })
);

app.use(guestLogger);

app.use("/auth", authRoutes);
app.use("/stories", storyRoutes);
app.use("/stories", reactionRoutes);
app.use("/users", userRoutes);
app.use("/stories", readRoutes);

app.use(
  morgan("combined", {
    stream: {
      write: (line) =>
        logger.http?.info(line.trim()) ?? logger.info(line.trim()),
    },
  })
);

app.use(errorHandler);

export default app;
