import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const BASE_URL = process.env.FRONTEND_URL;

const io = new Server(server, {
  cors: {
    origin: [BASE_URL],
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
