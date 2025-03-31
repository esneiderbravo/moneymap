import express from "express";
import cors from "cors";
import UserRoutes from "./routes/user/UserRoutes.js";
import AccountRoutes from "./routes/account/AccountRoutes.js";
import TransactionRoutes from "./routes/transaction/TransactionRoutes.js";
import HealthRoutes from "./routes/HealthRoutes.js";

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
 *
 * - `/api/health`       → Health check endpoint
 * - `/api/users`        → Manages user-related operations
 * - `/api/accounts`     → Handles user account management
 * - `/api/transactions` → Manages financial transactions
 *
 * Notes:
 * - All routes expect JSON request bodies where applicable.
 * - Error handling is implemented for all endpoints.
 */
app.use("/api/health", HealthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/accounts", AccountRoutes);
app.use("/api/transaction", TransactionRoutes);

/**
 * Global error handler.
 * Catches unhandled errors and sends a structured response.
 */
app.use((err, req, res) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

export default app;
