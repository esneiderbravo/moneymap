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
    return await prisma.user.findUnique({ where: { email } });
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
