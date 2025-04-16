import HTTPHandler from "../../utils/httpHandler";
import { TRANSACTION_SERVICE_URL } from "../../utils/constants";

/**
 * Creates a new transaction by sending form data to the Transaction service.
 *
 * @param {Object} formData - The transaction data to be sent to the service.
 * @param {string} formData.type - The type of the transaction (e.g., "credit" or "debit").
 * @param {number} formData.amount - The amount involved in the transaction.
 * @param {Date} formData.date - The date of the transaction.
 * @param {boolean} formData.paid - Specifies if the transaction is marked as paid or pending.
 * @param {string} formData.accountId - The ID of the account to which this transaction is associated.
 * @param {string} formData.categoryId - The ID of the category under which this transaction falls.
 *
 * @returns {Promise<Object | Array>} - Resolves to the created transaction object on success,
 * or returns an array with [null, statusCode, errorMessage] on failure.
 *
 * @throws {Error} - Throws an error if the HTTP request encounters an unexpected problem.
 */
export const createTransaction = async (formData) => {
  try {
    return await HTTPHandler.post(TRANSACTION_SERVICE_URL, formData);
  } catch (error) {
    console.error("createTransaction Error:", error.message);

    const statusCode = error?.response?.status || 500;
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred.";

    // Returns error details in a standardized format
    return [null, statusCode, errorMessage];
  }
};
