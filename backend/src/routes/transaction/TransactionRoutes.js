import express from "express";
import { createTransaction } from "../../controllers/transaction/TransactionController.js";

const router = express.Router();

router.post("/", createTransaction);

export default router;
