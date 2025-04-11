// Environment Variables
export const GOOGLE_AUTH_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID || "";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Endpoints
export const AUTH_SERVICE_URL = `${API_URL}/users/auth`;
export const ACCOUNT_SERVICE_URL = `${API_URL}/account`;
export const TRANSACTION_SERVICE_URL = `${API_URL}/transaction`;
export const USER_BALANCE_SERVICE_URL = `${API_URL}/users/balances`;
export const CATEGORY_SERVICE_URL = `${API_URL}/category`;

// UI Timings (in milliseconds)
export const SPLASH_TIMEOUT = 3000; // Time before transitioning from splash screen
export const FADE_IN_DURATION = 3; // Title fade-in duration (seconds)
export const LOADER_FADE_IN = 1.5; // Loader fade-in duration (seconds)

// Use variables
export const ACCOUNTS_ICON_MAPPER = {
  checking: "AssuredWorkloadSharp",
  savings: "Savings",
  wallet: "Wallet",
};
