import HTTPHandler from "../../utils/httpHandler";
import { USER_BALANCE_SERVICE_URL } from "../../utils/constants";

/**
 * Fetch user balances from the balance service.
 *
 * @param {string} userId - The user's ID.
 * @returns {Promise<[Object|null, number]>} - The response data and HTTP status code.
 */
export const getUserBalances = async (userId) => {
  try {
    if (!userId) {
      console.warn("⚠️ getUserBalances: Missing userId parameter.");
      return [null, 400]; // Bad Request
    }

    const response = await HTTPHandler.get(USER_BALANCE_SERVICE_URL, {
      userId: userId,
    });
    return [response.data, response.status];
  } catch (error) {
    const statusCode = error?.response?.status || 500;
    console.error(`❌ getUserBalances Error (${statusCode}):`, error.message);

    // Return null data with the relevant HTTP status code
    return [null, statusCode];
  }
};
