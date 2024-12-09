import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const user = mongoose.model("User", userSchema);

export default user;