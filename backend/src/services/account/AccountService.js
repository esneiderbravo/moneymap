import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Register a new account for a user or update an existing one.
 *
 * @param {Object} accountData - The account details.
 * @returns {Promise<Object>} - The created or updated account.
 */
export const upsertAccount = async (accountData) => {
  try {
    const { id, ...data } = accountData;

    if (id) {
      console.log("📌 Updating existing account...");
      return await prisma.account.update({
        where: { id },
        data,
      });
    }

    console.log("📌 Registering new account...");
    return await prisma.account.create({
      data: accountData,
    });
  } catch (error) {
    console.error("❌ Failed to create or update account:", error);
    throw new Error("Database error during account creation or update");
  }
};

/**
 * Adjust the account balance after a transaction is processed.
 *
 * @param {string} accountId - The ID of the account whose balance is to be updated.
 * @param {"income" | "expense"} type - The type of transaction, either "income" or "expense".
 * @param {number} amount - The monetary amount involved in the transaction.
 * @returns {Promise<void>} - Resolves when balance adjustment is complete or throws an error.
 */
export const affectBalances = async (accountId, type, amount) => {
  try {
    // Retrieve the current balance of the account
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error(`Account with ID ${accountId} not found.`);
    }

    console.log(
      `💰 Current balance for account ${accountId}: ${account.balance}`
    );

    // Calculate the new balance based on the transaction type
    const newBalance =
      type === "income"
        ? account.balance + amount // Add for income
        : account.balance - amount; // Subtract for expense

    console.log(`🔄 New balance for account ${accountId}: ${newBalance}`);

    // Update the account balance in the database
    await prisma.account.update({
      where: { id: accountId },
      data: { balance: newBalance },
    });

    console.log(`✅ Balance successfully updated for account ${accountId}`);
  } catch (error) {
    console.error("❌ Error updating account balance:", error);
    throw new Error("Failed to update account balance");
  }
};
