import express from "express";
import mongoose from "mongoose";
import http from "http";
import ChatRoom from "./dbSchema.js";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

// DO NOT FORGET TO DOTENV !!!
const uri =
  "mongodb+srv://ramoj745admin:75369854123@cluster0.lnmir.mongodb.net/dispochat?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.error("Could not connect to MongoDB"));

app.use(cors());
app.use(express.json());


const emitRooms = async () => {
  try {
    const rooms = await ChatRoom.find();
    io.emit("updateRooms", rooms);
  } catch (err) {
    console.error("Error fetching rooms:", err);
  }
};

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id)
  emitRooms()

  socket.on("disconnect", () => {
    console.log("Client disconnected.", socket.id)
  })
})


// ROUTES
app.post("/createRoom", async (req, res) => {
  const { name, password } = req.body;

  const newRoom = new ChatRoom({
    name: name,
    password: password ? password : undefined,
    isPasswordProtected: !!password,
  });

  try {
    console.log("Creating room...");
    await newRoom.save();
    emitRooms()
    res.status(201).json(newRoom);
    console.log("Room Created!");
  } catch (err) {
    console.error(err);
  }
}); 

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
