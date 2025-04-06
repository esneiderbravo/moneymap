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
