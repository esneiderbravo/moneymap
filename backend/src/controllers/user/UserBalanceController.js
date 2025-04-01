import { getUserAccounts } from "../../services/user/UserService.js";

/**
 * Handle request to get user balances.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 */
export const handleUserBalances = async (req, res) => {
  try {
    const userId = req.query?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userBalances = await getUserAccounts(userId);
    res.status(200).json({ data: userBalances, success: true });
  } catch (error) {
    console.error("❌ Error in handleBalances:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
