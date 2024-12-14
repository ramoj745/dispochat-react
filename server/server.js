import express from "express";
import mongoose from "mongoose";
import http from "http";
import ChatRoom from "./ChatRoomSchema.js";
import { Server } from "socket.io";
import "dotenv/config";
import cors from "cors";
import Message from "./messageSchema.js";
import User from "./userSchema.js";

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// MONGODB CONNECTION
const uri = process.env.MONGO_URI;

try {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("Could not connect to MongoDB");
}

// MIDDLEWARES
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);
  emitRooms();

  socket.on("joinRoom", async (roomId) => {
    //listen if client joined a room
    socket.join(roomId);
    console.log("Joined Room", roomId);

    const messages = await Message.find({ room: roomId }).sort({
      createdAt: 1,
    }); // on join, load messages from db
    socket.emit("loadMessages", messages);
  });

  socket.on("newMessage", async (data) => {
    //listen for any new messages, then emit to specific roomId
    io.to(data.roomId).emit("newMessage", {
      roomId: data.roomId,
      senderId: data.senderId,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected.", socket.id);
  });
});

//SOCKET.IO EMIT FUNC
const emitRooms = async () => {
  try {
    const rooms = await ChatRoom.find();

    const filteredRooms = rooms.map(({_id, name, users}) => ({
      _id, name, users
    }))

    io.emit("updateRooms", filteredRooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
  }
};

// ROUTES
app.post("/createRoom", async (req, res) => {
  const { name, password, clientId } = req.body;

  const newRoom = new ChatRoom({
    name: name,
    password: password ? password : undefined,
    isPasswordProtected: !!password,
    users: [clientId],
  });

  const existingUser = await User.findOne({
    username: clientId,
  });

  try {
    if (!existingUser) {
      const newRoomCreator = await User({
        username: clientId,
      });
      await newRoomCreator.save();
      console.log("Creating room...");
      await newRoom.save();
      emitRooms();
      res.status(201).json(newRoom);
      console.log("Room Created!");
    } else {
      res.json({ message: "Error: User already exists" });
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/joinRoom", async (req, res) => {
  const { roomId, clientId, password } = req.body;

  const room = await ChatRoom.findOne({ _id: roomId });

  if (!room) {
    return res.status(404).json({ message: "Room not found (404)" });
    } else {
      if (clientId && roomId && !password) {
        res.status(200).json({message: "Checking password...", isPasswordProtected: room.isPasswordProtected})
      } else {
        if (room.isPasswordProtected) {
          if (password === room.password) {
            res.status(200).json({message: "User has joined the room.", room})
          } else {
            res.status(200).json({message: "Wrong Password"})
          }
        } else {
          res.status(200).json({message: "User has joined the room.", room})
        }
      }
    }
});

app.post("/sendMessage", async (req, res) => {
  const { roomId, senderId, message } = req.body;

  const newMessage = new Message({
    user: senderId,
    room: roomId,
    message: message,
  });

  await newMessage.save();

  res.status(200).json({ message: "Request went through" });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
