import express from "express";
import {
  getProfile,
  getUsers,
  login,
  register,
  updateUser,
} from "../controllers/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/profile", getProfile);
userRouter.get("/friends", isAuthenticated, getUsers);
userRouter.put(
  "/",
  [isAuthenticated, upload.single("profilePicture")],
  updateUser
);
export default userRouter;
