import Message from "../models/Message.js";
import StatusCodes from "http-status-codes";

export const createMessage = async (req, res) => {
  const senderId = req.userId;
  const { receiverId, content } = req.body;
  const message = await Message.create({ senderId, receiverId, content });

  res.status(StatusCodes.CREATED).json(message);
};

export const getMessages = async (req, res) => {
  const senderId = req.userId;
  const { receiverId } = req.params;
  const messages = await Message.find({
    $or: [{ senderId }, { receiverId: senderId }],
  });

  res.status(StatusCodes.OK).json(messages);
};

export const seen = async (req, res) => {
  const senderId = req.userId;
  const { receiverId } = req.params;
  await Message.updateMany(
    { senderId: receiverId, receiverId: senderId, seen: false },
    { seen: true }
  );

  res.status(StatusCodes.OK).json({ message: "Messages seen" });
};
