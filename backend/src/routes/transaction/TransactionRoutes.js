import express from "express";
import * as TransactionController from "../../controllers/transaction/TransactionController.js";

const router = express.Router();

router.post("/", TransactionController.initiateTransaction);

export default router;
