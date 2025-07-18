import * as User from "../models/user.js";
import { signToken } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res
      .status(201)
      .json({ token: signToken({ id: user.id, email: user.email }) });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const row = await User.findByEmail(req.body.email);
    if (
      !row ||
      !(await User.comparePassword(req.body.password, row.password_hash))
    )
      return res.status(401).json({ message: "Invalid credentials" });
    res.json({ token: signToken({ id: row.id, email: row.email }) });
  } catch (err) {
    next(err);
  }
};
