import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  user: { type: String, ref: "User" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

messageSchema.index({ timestamp: 1 }, { expireAfterSeconds: 86400 });

const message = mongoose.model("Message", messageSchema);
export default message;
