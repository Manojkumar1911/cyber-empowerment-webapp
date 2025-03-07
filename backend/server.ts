import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import scamRoutes from "./routes/scamRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import { scamProtectionMiddleware } from "./middlewares/scamProtection";

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MongoDB URI is missing in environment variables!");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(scamProtectionMiddleware);

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/scam", authMiddleware, scamRoutes);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Cyber Empowerment API is running!" });
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");

    // Start server after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("⚠️ Shutting down server...");
  await mongoose.connection.close();
  console.log("🛑 MongoDB Disconnected");
  process.exit(0);
});
