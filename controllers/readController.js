// controllers/readController.js
import * as Reads from "../models/readHistory.js";

export const markRead = async (req, res, next) => {
  try {
    const user_id = req.user?.id || null;
    const guest_id = req.headers["x-guest-id"] || null;
    if (!user_id && !guest_id)
      return res.status(400).json({ message: "Missing identifier" });

    await Reads.markRead({ story_id: req.params.id, user_id, guest_id });
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
};
