import express from "express";
import { handleGoogleAuth } from "../../controllers/user/AuthController.js";
import { handleUserBalances } from "../../controllers/user/UserBalanceController.js";

const router = express.Router();

/**
 * @route   POST /api/users/auth
 * @desc    Handle Google authentication (Sign in / Sign up)
 * @access  Public
 */
router.post("/auth", handleGoogleAuth);
router.get("/balances", handleUserBalances);

export default router;
