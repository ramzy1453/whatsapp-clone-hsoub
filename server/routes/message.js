import express from "express";
import { createMessage, getMessages } from "../controllers/message.js";

const messageRouter = express.Router();

messageRouter.post("/", createMessage);
messageRouter.get("/:receiverId", getMessages);

export default messageRouter;
