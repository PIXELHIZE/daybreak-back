import { verifyToken } from "../utils/jwt.js";

export const authOptional = (req, _res, next) => {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    try {
      req.user = verifyToken(header.split(" ")[1]);
    } catch {}
  }
  next();
};
