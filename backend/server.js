import app from "./src/app.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/**
 * Retrieves the server port from environment variables.
 * Defaults to 5000 if not specified.
 *
 * @constant {number} PORT - The port on which the server runs.
 */
const PORT = process.env.PORT || 5000;

/**
 * Starts the Express server and listens on the specified port.
 * Logs the server URL to the console when successfully started.
 */
app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
