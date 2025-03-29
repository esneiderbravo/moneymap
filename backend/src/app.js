import express from "express";
import cors from "cors";
import UserRoutes from "./routes/user/UserRoutes.js";

/**
 * Express application instance.
 *
 * @constant {Express.Application} app - The main Express application.
 */
const app = express();

/**
 * Middleware setup:
 * - Enables Cross-Origin Resource Sharing (CORS) for API requests.
 * - Parses incoming JSON requests.
 */
app.use(cors());
app.use(express.json());

/**
 * API Routes:
 * - `/api/users` → Handles user-related operations.
 */
app.use("/api/users", UserRoutes);

/**
 * Global error handler.
 * Catches unhandled errors and sends a structured response.
 */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

export default app;
