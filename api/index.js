import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials:true
  })
);

const MONGODB_URI = process.env.MONGO_URI; 

mongoose.connect("mongodb+srv://mark:mark@kariuki-estate.utqja4d.mongodb.net/kariuki-estate?retryWrites=true&w=majority&appName=kariuki-estate")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
