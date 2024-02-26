import "express-async-errors";
import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { connectDB, connectServer } from "./config.js";
import userRouter from "./routes/user.js";
import isAuthenticated, {
  isSocketAuthenticated,
} from "./middlewares/isAuthenticated.js";
import messageRouter from "./routes/message.js";
import connectSocket from "./socket.js";
import { Server } from "socket.io";
import Message from "./models/Message.js";
import User from "./models/User.js";

// Server
const app = express();
const server = http.createServer(app);
console.log(path.join(path.resolve(), "public"));
// Middlewares
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/message", isAuthenticated, messageRouter);

// Connection
connectDB();
connectServer(server);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use(isSocketAuthenticated);

io.on("connection", async (socket) => {
  console.log(`user connected: ${socket.userId}`);

  socket.join(socket.userId);

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.userId}`);
  });

  socket.on("typing", (receiverId) => {
    socket.to(receiverId).emit("typing", socket.userId);
  });

  socket.on("stop_typing", (receiverId) => {
    socket.to(receiverId).emit("stop_typing", socket.userId);
  });

  socket.on("seen", async (senderId) => {
    const receiverId = socket.userId;

    await Message.updateMany(
      { senderId, receiverId, seen: false },
      { seen: true },
      { multi: true }
    ).exec();

    io.to(senderId).emit("seen", receiverId);
  });

  socket.on("send_message", async ({ receiverId, content }) => {
    const senderId = socket.userId;

    const message = await Message.create({ senderId, receiverId, content });

    io.to([receiverId, senderId]).emit("receive_message", message);
  });
});
