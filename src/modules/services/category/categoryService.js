import HTTPHandler from "../../utils/httpHandler";
import { CATEGORY_SERVICE_URL } from "../../utils/constants";

/**
 * Fetches all categories (both expense and income) from the Category service.
 *
 * @returns {Promise}
 */
export const getAllCategories = async () => {
  try {
    return await HTTPHandler.get(CATEGORY_SERVICE_URL);
  } catch (error) {
    console.error("getAllCategories Error:", error.message);

    const statusCode = error?.response?.status || 500;
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred.";

    return [null, statusCode, errorMessage];
  }
};
