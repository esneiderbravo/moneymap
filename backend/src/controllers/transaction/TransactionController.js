import {
  getTransactionsByAccount,
  processTransaction,
} from "../../services/transaction/TransactionService.js";
import { affectBalances } from "../../services/account/AccountService.js";

/**
 * Execute a new transaction.
 */
export const createTransaction = async (req, res) => {
  try {
    const { type, amount, paid, date, accountId, categoryId } = req.body;
    const transaction = await processTransaction(
      type,
      amount,
      paid,
      date,
      accountId,
      categoryId
    );
    await affectBalances(
      transaction.accountId,
      transaction.type,
      transaction.amount
    );
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ error: "Transaction processing failed" });
  }
};

/**
 * Get transactions for a specific account.
 */
export const fetchTransactionsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params; // Extract accountId from URL parameters
    if (!accountId) {
      return res.status(400).json({ error: "Account ID is required" });
    }
    const transactions = await getTransactionsByAccount(accountId);
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error("❌ Error retrieving transactions:", error);
    res.status(500).json({ error: "Failed to retrieve transactions" });
  }
};
