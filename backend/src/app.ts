import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticket.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL ?? "http://localhost:3001",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

export default app;