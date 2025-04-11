import { fetchAllCategories } from "../../services/categories/CategoryService.js";

/**
 * Controller to handle the request for retrieving all categories grouped by type.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await fetchAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error("❌ Failed to retrieve categories:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve categories" });
  }
};