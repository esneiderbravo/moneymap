import * as AccountService from "../../services/account/AccountService.js";

/**
 * Create and register a new user account.
 *
 * @function
 * @async
 * @param {Object} req - Express request object containing account data in `req.body`.
 * @param {Object} res - Express response object used to return status and data.
 * @returns {void} Sends a JSON response with the created account or error message.
 */
export const createNewAccount = async (req, res) => {
  try {
    const account = await AccountService.upsertAccount(req.body);
    res.status(201).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ error: "Account registration failed" });
  }
};
