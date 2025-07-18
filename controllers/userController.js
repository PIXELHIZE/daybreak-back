import * as User from "../models/user.js";

export const getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.user.id);
    if (!me) return res.status(404).json({ message: "Not found" });
    res.json(me);
  } catch (err) {
    next(err);
  }
};

export const getUserPublic = async (req, res, next) => {
  try {
    const u = await User.findById(req.params.id);
    if (!u) return res.status(404).json({ message: "Not found" });
    res.json(u);
  } catch (err) {
    next(err);
  }
};
