import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetches all categories from the database and groups them by type (expense and income).
 *
 * @returns {Promise<{ expense: Category[]; income: Category[] }>}
 * An object containing two arrays: `expense` and `income`, each with their respective categories.
 *
 * @throws {Error} If there is a database error during retrieval.
 */
export const fetchAllCategories = async () => {
  try {
    console.log("📌 Fetching all categories...");

    const [expenseCategories, incomeCategories] = await Promise.all([
      prisma.category.findMany({ where: { type: "expense" } }),
      prisma.category.findMany({ where: { type: "income" } }),
    ]);

    return {
      expense: expenseCategories,
      income: incomeCategories,
    };
  } catch (error) {
    console.error("❌ Failed to fetch categories:", error);
    throw new Error("Database error while retrieving categories");
  }
};
