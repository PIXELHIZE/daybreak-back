// routes/read.js
import { Router } from "express";
import { markRead } from "../controllers/readController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authOptional } from "../middlewares/authOptional.js";
export default Router().post("/:id/read", authOptional, markRead);
