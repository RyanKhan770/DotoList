import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./routes/items.js";
import { connectDB } from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use("/api/items", itemsRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(err.status || 500).json({
    error: {
        message: err.message || "Internal server error",
        status: err.status || 500,
    },
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: { message: "Route not found", status: 404 } });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
