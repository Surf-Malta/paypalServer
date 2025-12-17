const paypal: any = require("@paypal/checkout-server-sdk");
import { paypalClient } from "../config/paypal.config";
import { config } from "../config/env.config";
import { CreateOrderRequest, PaymentCapture } from "../types/payment.types";

/**
 * PayPal Service
 * Handles all PayPal payment operations
 */

export class PayPalService {
  /**
   * Create a new payment order
   */
  async createOrder(orderData: CreateOrderRequest): Promise<any> {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    const amount = orderData.amount.toFixed(2);
    const currency = orderData.currency || config.registration.currency;

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
          description: orderData.description || "Registration Payment",
        },
      ],
      application_context: {
        brand_name: config.app.name,
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: orderData.returnUrl || `${config.app.url}/payment/success`,
        cancel_url: orderData.cancelUrl || `${config.app.url}/payment/cancel`,
      },
    });

    try {
      const response = await paypalClient.execute(request);
      return {
        id: response.result.id,
        status: response.result.status,
        links: response.result.links,
        amount: parseFloat(amount),
        currency,
        createdAt: new Date(),
      };
    } catch (error: any) {
      console.error("PayPal Create Order Error:", error);
      throw new Error(`Failed to create PayPal order: ${error.message}`);
    }
  }

  /**
   * Capture payment for an approved order
   */
  /**
   * Capture payment for an approved order
   */
  async captureOrder(orderId: string): Promise<PaymentCapture> {
    try {
      // First check if order is already captured
      const orderDetails = await this.getOrderDetails(orderId);

      if (orderDetails.status === "COMPLETED") {
        console.log("Order already captured, returning existing details");
        const capture = orderDetails.purchase_units[0].payments.captures[0];
        return {
          id: capture.id,
          status: capture.status,
          amount: parseFloat(capture.amount.value),
          currency: capture.amount.currency_code,
          payerId: orderDetails.payer?.payer_id,
          payerEmail: orderDetails.payer?.email_address,
          capturedAt: new Date(capture.create_time),
        };
      }

      // If not captured, proceed with capture
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      request.requestBody({});

      console.log(
        `[${new Date().toISOString()}] calling paypalClient.execute for capture...`
      );
      const response = await paypalClient.execute(request);
      console.log(
        `[${new Date().toISOString()}] paypalClient.execute returned.`
      );
      const capture = response.result.purchase_units[0].payments.captures[0];

      return {
        id: capture.id,
        status: capture.status,
        amount: parseFloat(capture.amount.value),
        currency: capture.amount.currency_code,
        payerId: response.result.payer?.payer_id,
        payerEmail: response.result.payer?.email_address,
        capturedAt: new Date(capture.create_time),
      };
    } catch (error: any) {
      console.error("PayPal Capture Order Error:", error);

      // Handle specific error case where it might have been captured in a race condition
      if (error.message && error.message.includes("ORDER_ALREADY_CAPTURED")) {
        try {
          const orderDetails = await this.getOrderDetails(orderId);
          const capture = orderDetails.purchase_units[0].payments.captures[0];
          return {
            id: capture.id,
            status: capture.status,
            amount: parseFloat(capture.amount.value),
            currency: capture.amount.currency_code,
            payerId: orderDetails.payer?.payer_id,
            payerEmail: orderDetails.payer?.email_address,
            capturedAt: new Date(capture.create_time),
          };
        } catch (retryError) {
          throw new Error(
            `Failed to retrieve already captured order: ${error.message}`
          );
        }
      }

      throw new Error(`Failed to capture PayPal order: ${error.message}`);
    }
  }

  /**
   * Get order details
   */
  async getOrderDetails(orderId: string): Promise<any> {
    const request = new paypal.orders.OrdersGetRequest(orderId);

    try {
      console.log(
        `[${new Date().toISOString()}] calling paypalClient.execute for getOrderDetails...`
      );
      const response = await paypalClient.execute(request);
      console.log(
        `[${new Date().toISOString()}] paypalClient.execute returned for getOrderDetails.`
      );
      return response.result;
    } catch (error: any) {
      console.error("PayPal Get Order Error:", error);
      throw new Error(`Failed to get PayPal order details: ${error.message}`);
    }
  }

  /**
   * Verify webhook signature (for production use)
   */
  async verifyWebhookSignature(
    _webhookId: string,
    _headers: any,
    _body: any
  ): Promise<boolean> {
    // This is a placeholder for webhook verification
    // In production, implement proper webhook signature verification
    // using PayPal's webhook verification API
    return true;
  }

  /**
   * Refund a captured payment
   */
  async refundPayment(captureId: string, amount?: number): Promise<any> {
    const request = new paypal.payments.CapturesRefundRequest(captureId);

    if (amount) {
      request.requestBody({
        amount: {
          value: amount.toFixed(2),
          currency_code: config.registration.currency,
        },
      });
    }

    try {
      const response = await paypalClient.execute(request);
      return response.result;
    } catch (error: any) {
      console.error("PayPal Refund Error:", error);
      throw new Error(`Failed to refund payment: ${error.message}`);
    }
  }
}

export const paypalService = new PayPalService();
