import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Process a new financial transaction.
 *
 * @param {"expense" | "income"} type - The type of transaction, either "credit" or "debit".
 * @param {number} amount - The monetary amount involved in the transaction.
 * @param {boolean} paid - Whether the transaction has been paid or is pending.
 * @param {Date} date - The date of the transaction.
 * @param {string} accountId - The ID of the account where the transaction will be recorded.
 * @param {string} categoryId - The category ID associated with the transaction.
 * @returns {Promise<Object>} - Returns a promise that resolves to the created transaction object or throws an error if the process fails.
 */
export const processTransaction = async (
  type,
  amount,
  paid,
  date,
  accountId,
  categoryId
) => {
  try {
    console.log(`📌 Processing ${type} transaction for account: ${accountId}`);
    return await prisma.transaction.create({
      data: { type, amount, paid, date, accountId, categoryId },
    });
  } catch (error) {
    console.error("❌ Error processing transaction:", error);
    throw new Error("Database error while handling transaction");
  }
};

/**
 * Retrieve all transactions for a specific account.
 *
 * @param {string} accountId - The ID of the account for which transactions should be retrieved.
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of transactions or throws an error.
 */
export const getTransactionsByAccount = async (accountId) => {
  try {
    console.log(`📌 Fetching transactions for account: ${accountId}`);
    return await prisma.transaction.findMany({
      where: { accountId },
      include: { category: true },
      orderBy: { date: "desc" },
    });
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    throw new Error("Database error while fetching transactions.");
  }
};
