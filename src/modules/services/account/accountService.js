import HTTPHandler from "../../utils/httpHandler";
import { ACCOUNT_SERVICE_URL } from "../../utils/constants";

/**
 * Registers a new account by sending form data to the account service.
 *
 * @async
 * @param {Object} formData - The account registration details.
 * @param {string} formData.balance - The account balance.
 * @param {string} formData.description - The account description.
 * @param {string} formData.type - The account type (e.g., "checking", "savings").
 * @param {string} formData.color - The selected color for the account.
 * @returns {Promise} Resolves with response data or null and the HTTP success.
 */
export const registerAccount = async (formData) => {
  try {
    return await HTTPHandler.post(ACCOUNT_SERVICE_URL, formData);
  } catch (error) {
    console.error("registerAccount Error:", error.message);

    // Extract meaningful error information
    const statusCode = error?.response?.status || 500;
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred.";

    return [null, statusCode, errorMessage];
  }
};
