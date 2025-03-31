import express from "express";

const router = express.Router();

/**
 * Health Check Route
 * - Returns a success message to confirm the server is running.
 */
router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy ✅" });
});

export default router;
