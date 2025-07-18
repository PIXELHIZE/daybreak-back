import express from "express";
import authRoutes from "./routes/auth.js";
import storyRoutes from "./routes/story.js";
import reactionRoutes from "./routes/reaction.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/stories", storyRoutes);
app.use("/stories", reactionRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

export default app;
