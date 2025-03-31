import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Process a new financial transaction.
 *
 * @param {string} accountId - The ID of the target account.
 * @param {number} transactionAmount - Amount to be credited/debited.
 * @param {"credit" | "debit"} transactionType - Type of transaction.
 * @returns {Promise<Object>} - The created transaction object.
 */
export const processTransaction = async (
  accountId,
  transactionAmount,
  transactionType
) => {
  try {
    console.log(
      `📌 Processing ${transactionType} transaction for account: ${accountId}`
    );
    return await prisma.transaction.create({
      data: { accountId, amount: transactionAmount, type: transactionType },
    });
  } catch (error) {
    console.error("❌ Error processing transaction:", error);
    throw new Error("Database error while handling transaction");
  }
};

/**
 * Retrieve transaction history for an account.
 *
 * @param {string} accountId - The ID of the account.
 * @returns {Promise<Array>} - List of transactions.
 */
export const getTransactionHistory = async (accountId) => {
  try {
    console.log(`📌 Retrieving transactions for account: ${accountId}`);
    return await prisma.transaction.findMany({
      where: { accountId },
    });
  } catch (error) {
    console.error("❌ Error retrieving transactions:", error);
    throw new Error("Database error while fetching transactions");
  }
};
