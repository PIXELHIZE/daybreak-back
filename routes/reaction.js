import { Router } from "express";
import {
  likeStory,
  storyLikes,
  likedStatus,
} from "../controllers/reactionController.js";
import { authOptional } from "../middlewares/authOptional.js";
export default Router()
  .post("/:id/like", authOptional, likeStory)
  .get("/:id/likes", storyLikes)
  .get("/:id/liked", authOptional, likedStatus);
