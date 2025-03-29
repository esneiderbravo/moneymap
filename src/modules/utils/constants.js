// Environment Variables
export const GOOGLE_AUTH_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID || "";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Authentication Endpoints
export const AUTH_SERVICE_URL = `${API_URL}/users/auth`;

// UI Timings (in milliseconds)
export const SPLASH_TIMEOUT = 5000; // Time before transitioning from splash screen
export const FADE_IN_DURATION = 3; // Title fade-in duration (seconds)
export const LOADER_FADE_IN = 1.5; // Loader fade-in duration (seconds)

// Messages
export const LOGIN_SUCCESS_MESSAGE = "You have been logged in successfully.";
export const LOGIN_ERROR_MESSAGE =
  "Failed to authenticate with Google. Please try again.";

// Freeze constants to prevent accidental modification
export default Object.freeze({
  GOOGLE_AUTH_CLIENT_ID,
  API_URL,
  AUTH_SERVICE_URL,
  SPLASH_TIMEOUT,
  FADE_IN_DURATION,
  LOADER_FADE_IN,
  LOGIN_SUCCESS_MESSAGE,
  LOGIN_ERROR_MESSAGE,
});
