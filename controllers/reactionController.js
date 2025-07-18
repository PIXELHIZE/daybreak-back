import * as Reaction from "../models/reaction.js";

export const likeStory = async (req, res, next) => {
  try {
    const uid = req.user?.id || null;
    const gid = req.headers["x-guest-id"] || null;
    if (!uid && !gid)
      return res.status(400).json({ message: "Missing identifier" });
    await Reaction.like({
      story_id: req.params.id,
      user_id: uid,
      guest_id: gid,
    });
    res.status(201).json({ ok: true });
  } catch (err) {
    if (err.message.includes("UNIQUE"))
      return res.status(409).json({ message: "Already liked" });
    next(err);
  }
};

export const storyLikes = async (req, res, next) => {
  try {
    res.json({ likes: await Reaction.count(req.params.id) });
  } catch (err) {
    next(err);
  }
};
