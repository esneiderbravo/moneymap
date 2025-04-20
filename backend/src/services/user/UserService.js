import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Find a user by email.
 *
 * @param {string} email - The email of the user to find.
 * @returns {Promise<Object|null>} - The user object if found, otherwise null.
 */
export const findUserByEmail = async (email) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Database query error");
  }
};

/**
 * Create a new user in the database.
 *
 * @param {Object} userData - The user data to store.
 * @returns {Promise<Object>} - The created user object.
 */
export const createUser = async (userData) => {
  try {
    return await prisma.user.create({ data: userData });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Database insertion error");
  }
};

/**
 * Update user data only if it has changed.
 *
 * @param {Object} existingUser - The existing user object.
 * @param {Object} newUserData - The new user data to compare.
 * @returns {Promise<Object>} - The updated user object (or original if no changes).
 */
export const updateUserIfNeeded = async (existingUser, newUserData) => {
  const { id, ...storedUserData } = existingUser;

  // Check if there are changes
  const hasChanges = Object.keys(newUserData).some(
    (key) => storedUserData[key] !== newUserData[key]
  );

  if (!hasChanges) {
    console.log("✅ No updates needed for:", existingUser.email);
    return existingUser;
  }

  try {
    console.log("🛠️ Updating user:", existingUser.email);
    return await prisma.user.update({
      where: { id },
      data: newUserData,
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    throw new Error("Database update error");
  }
};

/**
 * Get all accounts for a specific user, along with the count of income and expense transactions for each account.
 *
 * @param {string} userId - The user's ID.
 * @returns {Promise<Object>} - The user's accounts with income and expense counts, alerts, and total balance.
 */
export const getUserAccounts = async (userId) => {
  try {
    console.log(`📌 Fetching accounts for user: ${userId}`);

    // Fetch all accounts for the user
    const accounts = await prisma.account.findMany({
      where: { userId },
      orderBy: {
        description: "asc",
      },
      select: {
        id: true,
        balance: true,
        description: true,
        type: true,
        color: true,
      },
    });

    const { accountsWithTransactionCounts, totalBalanceAmount } =
      await fetchAccountsWithTransactions(accounts);

    // Retrieve user alerts
    const alerts = await fetchUserAlerts();

    // Return formatted result
    return {
      accounts: accountsWithTransactionCounts,
      alerts,
      totalBalanceAmount,
    };
  } catch (error) {
    console.error(
      "❌ Error fetching user accounts with transaction counts:",
      error
    );
    throw new Error(
      "Database error while retrieving user accounts and transactions."
    );
  }
};

/**
 * Fetches user alert data related to outstanding expenses, income, and reminders.
 *
 * This function retrieves and returns an object containing financial alerts.
 * @returns {Promise<Object>} A promise that resolves to an object containing user alerts.
 */
export const fetchUserAlerts = async () => {
  return {
    outstandingExpenses: {
      itemCount: 0,
      totalAmount: 0,
    },
    income: {
      itemCount: 0,
      totalAmount: 0,
    },
    expenseReminders: {
      itemCount: 0,
    },
    incomeReminders: {
      itemCount: 0,
    },
  };
};

/**
 * Fetch accounts augmented with the number of income and expense transactions for each account.
 *
 * @param {Array<Object>} accounts - Array of account objects. Each account object should contain at least:
 *    - `id` (string): The unique identifier of the account.
 *    - `balance` (number): The current balance of the account.
 * @returns {Promise<Object>} - A Promise that resolves to an object containing:
 *    - `accountsWithTransactionCounts` (Array<Object>): Array of accounts, where each account also includes:
 *        - `incomeCount` (number): The number of income transactions for the account.
 *        - `expenseCount` (number): The number of expense transactions for the account.
 *    - `totalBalanceAmount` (number): The sum of balances of all accounts.
 */
export const fetchAccountsWithTransactions = async (accounts) => {
  // Fetch the number of income and expense transactions for each account
  const accountsWithTransactionCounts = await Promise.all(
    accounts.map(async (account) => {
      const incomeCount = await prisma.transaction.count({
        where: { accountId: account.id, type: "income" },
      });

      const expenseCount = await prisma.transaction.count({
        where: { accountId: account.id, type: "expense" },
      });

      return {
        ...account,
        incomeCount,
        expenseCount,
      };
    })
  );

  // Calculate the total balance for all accounts
  const totalBalanceAmount = accountsWithTransactionCounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );

  return { accountsWithTransactionCounts, totalBalanceAmount };
};
