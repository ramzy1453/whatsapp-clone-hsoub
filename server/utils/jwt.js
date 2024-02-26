import jwt from "jsonwebtoken";
import "dotenv/config";

export function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
