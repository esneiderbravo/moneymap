import { processTransaction } from "../../services/transaction/TransactionService.js";
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
