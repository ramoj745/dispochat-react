import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: { type: String, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const message = mongoose.model("Message", messageSchema);
export default message;
