import * as TransactionService from "../../services/transaction/TransactionService.js";

/**
 * Execute a new transaction.
 */
export const initiateTransaction = async (req, res) => {
  try {
    const { accountId, amount, type } = req.body;
    if (!["credit", "debit"].includes(type)) {
      return res.status(400).json({ error: "Invalid transaction type" });
    }
    const transaction = await TransactionService.processTransaction(
      accountId,
      amount,
      type
    );
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Transaction processing failed" });
  }
};
