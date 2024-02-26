import { Server } from "socket.io";

export default function connectSocket(app) {
  const io = new Server(app, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
}
