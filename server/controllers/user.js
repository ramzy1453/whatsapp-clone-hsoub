import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwt.js";
import { io } from "../index.js";

const hostname = process.env.hostname;
const port = process.env.PORT;

export const register = async (req, res) => {
  const { lastName, firstName, email, password, confirmPassword } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ error: "User already exists" });
  }

  if (password !== confirmPassword) {
    return res.json({ error: "Passwords don't match" });
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const defaultPicture = `http://${hostname}:${port}/uploads/default-picture.jpg`;

  const user = await User.create({
    lastName,
    firstName,
    email,
    password: hashedPassword,
    profilePicture: defaultPicture,
  });

  user.password = undefined;

  const accessToken = createToken(user._id);
  io.emit("user_created", user);
  res.status(StatusCodes.CREATED).json({
    message: "User registered successfully",
    user,
    accessToken,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ error: "User doesn't exist" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.json({ error: "Invalid credentials" });
  }

  user.password = undefined;

  const accessToken = createToken(user._id);

  res.status(StatusCodes.OK).json({
    message: "User logged in successfully",
    user,
    accessToken,
  });
};

export const getProfile = async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const user = await User.findById(userId);

  user.password = undefined;

  res.status(StatusCodes.OK).json(user);
};

export const getUsers = async (req, res) => {
  const userId = req.userId;
  console.log(userId);

  const users = await User.find({ _id: { $ne: userId } }).select("-password");

  res.status(StatusCodes.OK).json(users);
};

export const updateUser = async (req, res) => {
  const userId = req.userId;
  const { lastName, firstName, status } = req.body;
  const profilePicture = `http://${hostname}:${port}/uploads/${req.file?.filename}`;

  const user = await User.findByIdAndUpdate(
    userId,
    { lastName, firstName, status, profilePicture },
    { new: true }
  );

  user.password = undefined;

  io.emit("user_updated", user);

  res.status(StatusCodes.OK).json({
    message: "User updated successfully",
  });
};
