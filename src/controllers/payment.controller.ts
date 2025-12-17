import { Request, Response } from "express";
import { paypalService } from "../services/paypal.service";
import { registrationService } from "../services/registration.service";
import { asyncHandler } from "../middleware/error.middleware";
import { CreateOrderRequest, ApiResponse } from "../types/payment.types";
import { PaymentError, NotFoundError } from "../middleware/error.middleware";

/**
 * Payment Controller
 * Handles payment-related operations
 */

export class PaymentController {
  /**
   * Create a new payment order
   * POST /api/payments/create
   */
  createOrder = asyncHandler(async (req: Request, res: Response) => {
    const orderData: CreateOrderRequest = req.body;

    // Create PayPal order
    const order = await paypalService.createOrder(orderData);

    // If user data is provided, create a registration record
    let registrationId: string | undefined;
    if (orderData.userData) {
      const registration = await registrationService.createRegistration(
        orderData.userData,
        order.id,
        orderData.amount,
        orderData.currency || "USD"
      );
      registrationId = registration.id;
    }

    const response: ApiResponse = {
      success: true,
      data: {
        orderId: order.id,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        registrationId,
        approvalUrl: order.links?.find((link: any) => link.rel === "approve")
          ?.href,
        links: order.links,
      },
    };

    res.status(201).json(response);
  });

  /**
   * Capture an approved payment
   * POST /api/payments/capture/:orderId
   */
  captureOrder = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    // Capture the payment
    console.log(
      `[${new Date().toISOString()}] Starting captureOrder for orderId: ${orderId}`
    );
    const capture = await paypalService.captureOrder(orderId);
    console.log(
      `[${new Date().toISOString()}] Finished captureOrder for orderId: ${orderId}, Status: ${capture.status}`
    );

    if (capture.status !== "COMPLETED") {
      throw new PaymentError("Payment capture failed", "CAPTURE_FAILED");
    }

    // Update registration status if exists
    const registration =
      await registrationService.getRegistrationByPaymentId(orderId);
    if (registration) {
      console.log(
        `[${new Date().toISOString()}] Updating registration status for ID: ${registration.id}`
      );
      await registrationService.completeRegistration(
        registration.id,
        "completed"
      );
      console.log(
        `[${new Date().toISOString()}] Registration updated for ID: ${registration.id}`
      );
    }

    const response: ApiResponse = {
      success: true,
      data: {
        captureId: capture.id,
        status: capture.status,
        amount: capture.amount,
        currency: capture.currency,
        payerEmail: capture.payerEmail,
        capturedAt: capture.capturedAt,
        registrationId: registration?.id,
      },
    };

    res.status(200).json(response);
  });

  /**
   * Get payment order details
   * GET /api/payments/:orderId
   */
  getOrderDetails = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const orderDetails = await paypalService.getOrderDetails(orderId);

    const response: ApiResponse = {
      success: true,
      data: orderDetails,
    };

    res.status(200).json(response);
  });

  /**
   * Handle PayPal webhook events
   * POST /api/payments/webhook
   */
  handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    const webhookEvent = req.body;

    console.log("PayPal Webhook Event:", webhookEvent.event_type);

    // Handle different event types
    switch (webhookEvent.event_type) {
      case "PAYMENT.CAPTURE.COMPLETED":
        // Payment was captured successfully
        const captureId = webhookEvent.resource.id;
        console.log("Payment captured:", captureId);
        break;

      case "PAYMENT.CAPTURE.DENIED":
        // Payment was denied
        console.log("Payment denied");
        break;

      case "PAYMENT.CAPTURE.REFUNDED":
        // Payment was refunded
        console.log("Payment refunded");
        break;

      default:
        console.log("Unhandled webhook event:", webhookEvent.event_type);
    }

    // Always respond with 200 to acknowledge receipt
    res.status(200).json({ received: true });
  });

  /**
   * Refund a payment
   * POST /api/payments/refund/:captureId
   */
  refundPayment = asyncHandler(async (req: Request, res: Response) => {
    const { captureId } = req.params;
    const { amount } = req.body;

    const refund = await paypalService.refundPayment(captureId, amount);

    const response: ApiResponse = {
      success: true,
      data: {
        refundId: refund.id,
        status: refund.status,
        amount: refund.amount,
      },
    };

    res.status(200).json(response);
  });
}

export const paymentController = new PaymentController();
