import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./DB/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import bookRoutes from "./routes/book.routes.js";

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
app.use("/api/v1/book", bookRoutes);

connectDB();

app.use(errorMiddleware);
