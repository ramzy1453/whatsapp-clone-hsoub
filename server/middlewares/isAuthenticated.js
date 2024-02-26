import "dotenv/config";
import StatusCodes from "http-status-codes";
import { verifyToken } from "../utils/jwt.js";

export default async function isAuthenticated(req, res, next) {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
  const token = authHeaders.replace("Bearer ", "");
  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
}

export const isSocketAuthenticated = (socket, next) => {
  if (!socket.handshake.query || !socket.handshake.query.token) {
    return next(new Error("Authentication invalid"));
  }

  try {
    const payload = verifyToken(socket.handshake.query.token);
    socket.userId = payload.userId;
    next();
  } catch (error) {
    next(error);
  }
};
