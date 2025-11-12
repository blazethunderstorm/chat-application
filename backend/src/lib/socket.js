import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/user.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", async (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    
    // Update user's lastSeen to null (indicating online)
    try {
      await User.findByIdAndUpdate(userId, { lastSeen: null });
      // Notify all users that this user is now online
      io.emit("userStatusUpdate", { userId, lastSeen: null, isOnline: true });
    } catch (error) {
      console.error("Error updating user online status:", error);
    }
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", async () => {
    console.log("A user disconnected", socket.id);
    
    if (userId) {
      const lastSeenTime = new Date();
      
      try {
        // Update lastSeen timestamp when user disconnects
        await User.findByIdAndUpdate(userId, { lastSeen: lastSeenTime });
        
        // Notify all users about the last seen update
        io.emit("userStatusUpdate", { userId, lastSeen: lastSeenTime, isOnline: false });
      } catch (error) {
        console.error("Error updating user last seen:", error);
      }
      
      delete userSocketMap[userId];
    }
    
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };