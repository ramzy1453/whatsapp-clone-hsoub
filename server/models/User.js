import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: [true, "Please provide lastname"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "Please provide firstname"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Email don't match it's pattern",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [8, "Your password mustn't be under 8 characters"],
    },
    profilePicture: {
      type: String,
    },
    status: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
