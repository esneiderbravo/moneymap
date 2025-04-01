import express from "express";

const router = express.Router();

/**
 * Health Check Route
 * - Returns a success message to confirm the server is running.
 */
router.get("/", (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const uptimeInSeconds = process.uptime(); // Server uptime in seconds
    const uptimeInHours = (uptimeInSeconds / 3600).toFixed(2); // Convert to hours and format to 2 decimal places

    console.info(`📡 Health check requested at ${timestamp}`);
    console.info(`Server is healthy ✅, uptime: ${uptimeInHours} hours`);

    res.status(200).json({
      message: "Server is healthy ✅",
      uptime: uptimeInHours, // Optionally include uptime in response
    });
  } catch (error) {
    console.error("❌ Health check failed:", error);
    res.status(500).json({ success: false, message: "Health check failed" });
  }
});

export default router;
