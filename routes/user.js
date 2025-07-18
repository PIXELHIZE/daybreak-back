// routes/user.js
import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import * as c from "../controllers/userController.js";

const r = Router();

r.get("/me", authenticate, c.getMe);

r.get("/:id", c.getUserPublic); // 공개 프로필

export default r;
