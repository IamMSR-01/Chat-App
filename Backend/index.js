import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import messageRoutes from "./src/routes/message.routes.js";
import dotenv from "dotenv";
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./src/lib/socket.js";

dotenv.config();
const PORT = process.env.PORT || 7000;
const BASE_URL = process.env.FRONTEND_URL;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: BASE_URL ,
    credentials: true,
  })
);

// import routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
