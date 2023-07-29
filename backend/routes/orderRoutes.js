import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controller/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
