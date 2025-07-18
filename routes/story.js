import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import * as c from "../controllers/storyController.js";

const r = Router();
r.post("/", authenticate, c.createStory);
r.get("/", c.listStories);
r.get("/random", c.randomStory);
r.get("/my-stories", authenticate, c.myStories);
r.get("/:id", c.getStory);
r.delete("/:id", authenticate, c.deleteStory);
export default r;
