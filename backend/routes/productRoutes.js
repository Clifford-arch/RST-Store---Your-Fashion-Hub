import express from "express";

import {
  deleteProduct,
  getProductId,
  getProducts,
  updateProduct,
  createProduct,
  createProductReview,
} from "../controller/productController.js";

import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductId)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
