import {
  createUser,
  findUserByEmail,
} from "../../services/user/UserService.js";

/**
 * Handles Google authentication.
 *
 * - Checks if a user with the provided email exists.
 * - If not, creates a new user in the database.
 * - Returns the user data.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 */
export const handleGoogleAuth = async (req, res) => {
  try {
    const { email, ...userData } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let user = await findUserByEmail(email);

    if (!user) {
      console.log(`🆕 Creating new user: ${email}`);
      user = await createUser({ email, ...userData });
    } else {
      console.log(`✅ User found: ${email}`);
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Error in handleGoogleAuth:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
