import express from "express";
import mongoose from "mongoose";
import http from "http";
import ChatRoom from "./ChatRoomSchema.js";
import { Server } from "socket.io";
import "dotenv/config";
import cors from "cors";
import Message from "./messageSchema.js";
import User from "./userSchema.js";
import message from "./messageSchema.js";

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

  socket.on("disconnect", () => {
    console.log("Client disconnected.", socket.id);
  });
});

//SOCKET.IO EMIT FUNC
const emitRooms = async () => {
  try {
    const rooms = await ChatRoom.find();
    io.emit("updateRooms", rooms);
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
      res.json({message: "Error: User already exists"})
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/getRoom", async (req, res) => {
  const roomId = req.body.roomId;
  //socket can be get here also

  const room = await ChatRoom.findOne({ _id: roomId });

  if (!room) {
    return res.status(404).json({ message: "Room not found (404)" });
  } else {
    room.users.push(socket.id);
    res
      .status(200)
      .json({ message: `User {socket.id} joined the room.`, room });
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
