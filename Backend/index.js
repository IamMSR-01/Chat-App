import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import messageRoutes from "./src/routes/message.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./src/lib/socket.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 7000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Updated CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Using environment variable
    credentials: true,
  })
);

// --- START OF TEST ROUTE ---
app.get("/test", (req, res) => {
  res.status(200).send("Backend is running the latest code! Deployed successfully.");
});
// --- END OF TEST ROUTE ---

// import routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/messages", messageRoutes);

// The static file serving block has been REMOVED.

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Changed log message slightly
  connectDB();
});