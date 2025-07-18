import { Router } from "express";
import { likeStory, storyLikes } from "../controllers/reactionController.js";

export default Router()
  .post("/:id/like", likeStory) // 회원·비회원 모두 가능
  .get("/:id/likes", storyLikes);
