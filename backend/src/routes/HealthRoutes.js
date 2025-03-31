import express from "express";

const router = express.Router();

/**
 * Health Check Route
 * - Returns a success message to confirm the server is running.
 */
router.get("/", (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const uptime = process.uptime(); // Server uptime in seconds

    console.info(`📡 Health check requested at ${timestamp}`);
    console.info(`Server is healthy ✅, uptime: ${Math.floor(uptime)}s`);

    res.status(200).json({
      message: "Server is healthy ✅",
    });
  } catch (error) {
    console.error("❌ Health check failed:", error);
    res.status(500).json({ success: false, message: "Health check failed" });
  }
});

export default router;
