import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String },
  isPasswordProtected: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const chatRoom = mongoose.model("ChatRoom", chatRoomSchema);
export default chatRoom;
