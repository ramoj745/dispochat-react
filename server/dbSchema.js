import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String },
  isPasswordProtected: { type: Boolean, default: false },
  users: [{ type: String }],
});

const chatRoom = mongoose.model("ChatRoom", chatRoomSchema);

export default chatRoom
