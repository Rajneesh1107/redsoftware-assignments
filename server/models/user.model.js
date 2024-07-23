const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please! Enter your uername"],
      unique: true,
    },
    password: { type: String, required: [true, "Please! Enter your password"] },
    email: {
      type: String,
      required: [true, "Please! Enter your email"],
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
