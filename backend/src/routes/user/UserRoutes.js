import express from "express";
import { handleGoogleAuth } from "../../controllers/user/UserController.js";

const router = express.Router();

/**
 * @route   POST /api/users/auth
 * @desc    Handle Google authentication (Sign in / Sign up)
 * @access  Public
 */
router.post("/auth", handleGoogleAuth);

export default router;
