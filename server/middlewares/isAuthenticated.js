import "dotenv/config";
import jwt from "jsonwebtoken";

export default async function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;

  if (!authHeaders) {
    return token.send({ message: "Authentication invalid" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.send({ message: "Authentication invalid" });
  }
}

export const isSocketAuthenticated = (socket, next) => {
  if (!socket.handshake.query || !socket.handshake.query.token) {
    return next(new Error("Authentication invalid"));
  }

  try {
    const data = jwt.verify(socket.handshake.query.token);
    socket.userId = data.userId;
    next();
  } catch (error) {
    next(error);
  }
};
