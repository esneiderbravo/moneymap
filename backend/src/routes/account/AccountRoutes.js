import express from "express";
import * as AccountController from "../../controllers/account/AccountController.js";

const router = express.Router();

router.post("/", AccountController.createNewAccount);
router.get("/", AccountController.listAccounts);
router.get("/:id", AccountController.getAccountInfo);

export default router;
