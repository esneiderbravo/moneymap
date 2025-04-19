import express from "express";
import {
  createTransaction,
  fetchTransactionsByAccount,
} from "../../controllers/transaction/TransactionController.js";

const router = express.Router();

router.post("/", createTransaction);

router.get("/:accountId", fetchTransactionsByAccount);

export default router;
