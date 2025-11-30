import { Router } from "express";
import { paymentController } from "../controllers/payment.controller";
import {
  createOrderValidation,
  orderIdValidation,
} from "../middleware/validation.middleware";

const router = Router();

/**
 * Payment Routes
 */

// Create a new payment order
router.post("/create", createOrderValidation, paymentController.createOrder);

// Capture an approved payment
router.post(
  "/capture/:orderId",
  orderIdValidation,
  paymentController.captureOrder
);

// Handle PayPal webhooks
router.post("/webhook", paymentController.handleWebhook);

// Refund a payment
router.post("/refund/:captureId", paymentController.refundPayment);

// Get payment order details - MUST BE LAST to avoid matching /create, /webhook, etc.
router.get("/:orderId", orderIdValidation, paymentController.getOrderDetails);

export default router;
