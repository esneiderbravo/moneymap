import express from "express";
import { getCategories } from "../../controllers/category/CategoryController.js";

const router = express.Router();

router.get("/", getCategories);

export default router;
