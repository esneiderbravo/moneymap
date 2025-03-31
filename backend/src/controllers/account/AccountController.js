import * as AccountService from "../../services/account/AccountService.js";

/**
 * Create and register a new user account.
 */
export const createNewAccount = async (req, res) => {
  try {
    const account = await AccountService.registerAccount(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: "Account registration failed" });
  }
};

/**
 * Fetch all available accounts.
 */
export const listAccounts = async (req, res) => {
  try {
    const accounts = await AccountService.fetchAllAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve accounts" });
  }
};

/**
 * Retrieve details of a specific account.
 */
export const getAccountInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await AccountService.findAccountDetails(id);
    if (!account) return res.status(404).json({ error: "Account not found" });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving account details" });
  }
};
