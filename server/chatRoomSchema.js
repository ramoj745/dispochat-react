import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String },
  isPasswordProtected: { type: Boolean, default: false },
  users: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

chatRoomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const chatRoom = mongoose.model("ChatRoom", chatRoomSchema);
export default chatRoom;
