import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Yahan humne CORS options theek kar diye hain
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN, // Yeh aapke Render environment variable se aayega
    credentials: true, // Yeh zaroori hai cookies ke liye
    methods: ["GET", "POST"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// store online users
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };