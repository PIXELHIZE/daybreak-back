import jwt from "jsonwebtoken";
export const signToken = (payload, exp = "7d") =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: exp });
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
