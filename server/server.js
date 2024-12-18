import express from "express";
import mongoose from "mongoose";
import http from "http";
import ChatRoom from "./chatRoomSchema.js";
import { Server } from "socket.io";
import "dotenv/config";
import cors from "cors";
import Message from "./messageSchema.js";

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
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

io.on("connection", async (socket) => {
  console.log("New client connected: ", socket.id);

  try {
    // fetch rooms
    emitRooms()
  } catch (err) {
    console.error("Error fetching rooms:", err);
  }

  socket.on("joinRoom", async (roomId) => {
    //listen if client joined a room, load messages from db
    socket.join(roomId);
    console.log("Joined Room", roomId);

    const messages = await Message.find({ room: roomId }).sort({
      createdAt: 1,
    });
    socket.emit("loadMessages", messages);
    socket.emit("JoinRoom", { roomId: roomId, clientId: socket.id });
  });

  socket.on("newMessage", async (data) => {
    //listen for any new messages, then emit to specific roomId
    io.to(data.roomId).emit("newMessage", {
      roomId: data.roomId,
      senderId: data.senderId,
      message: data.message,
    });
  });

  socket.on("disconnect", async () => {
    console.log("Client disconnected.", socket.id);
  });
});

async function emitRooms() {
  const rooms = await ChatRoom.find();
  const filteredRooms = rooms.map(({ _id, name, users }) => ({
    _id,
    name,
    users,
  }));

  io.emit("updateRooms", filteredRooms);
}

// ROUTES

app.get("/", (req, res) => {
  res.json("Connected!")
})

app.post("/createRoom", async (req, res) => {
  const { name, password, clientId } = req.body;
  emitRooms()

  try {
    const newRoom = new ChatRoom({
      name: name,
      password: password ? password : undefined,
      isPasswordProtected: !!password,
      users: [clientId],
    });
    
    console.log("Creating room...");
    await newRoom.save();
    res.status(201).json(newRoom);
    console.log("Room Created!");
  } catch (err) {
    console.error(err);
  }
});

app.post("/joinRoom", async (req, res) => {
  const { roomId, clientId, password } = req.body;
  
  const room = await ChatRoom.findOne({ _id: roomId });
  const passwordEnabled = room.isPasswordProtected;

  if (!room) {
    return res.status(404).json({ message: "Room not found (404)" });
  } else {
    if (clientId && roomId && !password) {
      // first request (checking if password enabled)
      if (!passwordEnabled) {
        // if not, immediately add user to db, and send boolean for rendering in client
        await ChatRoom.findOneAndUpdate(
          { _id: roomId },
          { $addToSet: { users: clientId } },
          { new: true }
        );

        res.status(200).json({
          isPasswordProtected: room.isPasswordProtected,
        });
      } else {
        res.status(200).json({
          message: "Checking password...",
          isPasswordProtected: room.isPasswordProtected,
        });
      }
    } else {
      // for second request (from password modal)

      if (passwordEnabled) {
        if (password === room.password) {
          await ChatRoom.findOneAndUpdate(
            { _id: roomId },
            { $addToSet: { users: clientId } },
            { new: true }
          );

          res.status(200).json({ message: "User has joined the room.", room });
        } else {
          res.status(200).json({ message: "Wrong Password" });
        }
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

app.delete("/LeaveRoom/:roomId/user/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  const roomId = req.params.roomId;

  const updatedRoom = await ChatRoom.findOneAndUpdate(
    { _id: roomId },
    { $pull: { users: clientId } },
    { new: true }
  );

  if (updatedRoom.users.length === 0) {
    const deletedRoom = await ChatRoom.findOneAndDelete({ _id: roomId });
    emitRooms()
    res.status(200).json({
      message: "No more users left, room deleted successfully",
      deletedRoom,
    });
  } else {
    emitRooms()
    res.status(200).json({ message: `User ${clientId} has left the room:` });
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
