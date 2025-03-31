import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Register a new account for a user.
 *
 * @param {Object} accountData - The account details.
 * @returns {Promise<Object>} - The created account.
 */
export const registerAccount = async (accountData) => {
  try {
    console.log("📌 Registering new account...");
    return await prisma.account.create({
      data: accountData,
    });
  } catch (error) {
    console.error("❌ Failed to register account:", error);
    throw new Error("Database error during account creation");
  }
};

/**
 * Retrieve all available accounts.
 *
 * @returns {Promise<Array>} - List of accounts.
 */
export const fetchAllAccounts = async () => {
  try {
    console.log("📌 Fetching all accounts...");
    return await prisma.account.findMany({
      include: { transactions: true },
    });
  } catch (error) {
    console.error("❌ Failed to fetch accounts:", error);
    throw new Error("Database error while retrieving accounts");
  }
};

/**
 * Get details of a specific account.
 *
 * @param {string} accountId - The ID of the account.
 * @returns {Promise<Object|null>} - The account object or null if not found.
 */
export const findAccountDetails = async (accountId) => {
  try {
    console.log(`📌 Looking up account: ${accountId}`);
    return await prisma.account.findUnique({
      where: { id: accountId },
      include: { transactions: true },
    });
  } catch (error) {
    console.error("❌ Error fetching account details:", error);
    throw new Error("Database error while retrieving account");
  }
};
