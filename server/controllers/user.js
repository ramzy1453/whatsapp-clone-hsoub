import "dotenv/config";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwt.js";
import { io } from "../index.js";
import jwt from "jsonwebtoken";

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
  const { email, password } = req.body; // 1. استخراج البريد الإلكتروني وكلمة المرور من الطلب

  const user = await User.findOne({ email }); // 2. البحث عن المستخدم في قاعدة البيانات باستخدام البريد الإلكتروني

  if (!user) {
    // 3. التحقق من وجود المستخدم
    return res.json({ error: "User doesn't exist" }); // إذا لم يكن المستخدم موجودًا، نعيد رسالة خطأ
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password); // 4. مقارنة كلمة المرور المدخلة مع كلمة المرور المخزنة في قاعدة البيانات

  if (!isPasswordCorrect) {
    // 5. التحقق من صحة كلمة المرور
    return res.json({ error: "Invalid credentials" }); // إذا كانت كلمة المرور غير صحيحة، نعيد رسالة خطأ
  }

  user.password = undefined; // 6. إخفاء كلمة المرور قبل إرسال بيانات المستخدم للعميل

  const accessToken = createToken(user._id); // 7. إنشاء رمز الوصول (token) باستخدام معرف المستخدم

  res.status(StatusCodes.OK).json({
    // 8. إرسال استجابة تحتوي على رسالة نجاح، بيانات المستخدم، ورمز الوصول
    message: "User logged in successfully",
    user,
    accessToken,
  });
};
export const getProfile = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);

  user.password = undefined;
  console.log("getProfile", user.profilePicture);

  res.status(StatusCodes.OK).json(user);
};

export const getUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.userId } }).select(
    "-password"
  );

  res.status(StatusCodes.OK).json(users);
};

export const updateUser = async (req, res) => {
  const userId = req.userId;
  const { lastName, firstName, status } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      lastName,
      firstName,
      status,
    },
    { new: true }
  );

  user.password = undefined;

  io.emit("user_updated", user);

  res.status(StatusCodes.OK).json(user);
};

export const updateProfilePicture = async (req, res) => {
  const userId = req.userId;

  console.log(req.file);

  const profilePicture = `http://${hostname}:${port}/uploads/${req.file?.filename}`;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      profilePicture,
    },
    { new: true }
  );

  user.password = undefined;
  console.log("updateUser", user.profilePicture);

  io.emit("user_updated", user);

  res.status(StatusCodes.OK).json(user);
};
