import HTTPHandler from "../../utils/httpHandler";
import { ACCOUNT_SERVICE_URL } from "../../utils/constants";

/**
 * Registers a new account by sending form data to the account service.
 *
 * @async
 * @param {Object} formData - The account registration details.
 * @returns {Promise} Resolves with response data or null and the HTTP success.
 */
export const upsertAccount = async (formData) => {
  try {
    return await HTTPHandler.post(ACCOUNT_SERVICE_URL, formData);
  } catch (error) {
    console.error("upsertAccount Error:", error.message);

    // Extract meaningful error information
    const statusCode = error?.response?.status || 500;
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred.";

    return [null, statusCode, errorMessage];
  }
};
