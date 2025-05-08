import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import dotenv from "dotenv";
import {connectDB} from "./src/lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// import routes
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
});
