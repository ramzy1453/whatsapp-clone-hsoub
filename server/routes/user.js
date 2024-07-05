import express from "express";
import {
  getProfile,
  getUsers,
  login,
  register,
  updateProfilePicture,
  updateUser,
} from "../controllers/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/profile", isAuthenticated, getProfile);
userRouter.get("/friends", isAuthenticated, getUsers);
userRouter.put("/", isAuthenticated, updateUser);
userRouter.put(
  "/profile-picture",
  [isAuthenticated, upload.single("profilePicture")],
  updateProfilePicture
);
export default userRouter;
