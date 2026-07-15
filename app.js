import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./DB/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

export const app = express();

config({ path: "./config/config.env" });

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);

connectDB();

app.use(errorMiddleware);
