// User authentication API calls
import HTTPHandler from "../../utils/httpHandler";
import { AUTH_SERVICE_URL } from "../../utils/constants";

/**
 * Login service
 *
 * Sends user authentication data to the server and returns the response.
 *
 * @param {Object} authData - Authentication data containing:
 *   @param {string} authData.email - User's email.
 *   @param {string} authData.password - User's password (optional if using OAuth).
 *
 * @returns {Promise<Object>} Resolves with:
 *   - `[data, status]` on success.
 *   - `[null, status]` on failure.
 */
export const loginService = async (authData) => {
  try {
    return await HTTPHandler.post(AUTH_SERVICE_URL, authData);
  } catch (error) {
    console.error("LoginService Error:", error.message);

    // Handle network errors or unexpected server failures
    return [null, error?.response?.status || 500];
  }
};
