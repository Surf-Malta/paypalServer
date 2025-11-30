import { config } from "./env.config";

const paypal: any = require("@paypal/checkout-server-sdk");

/**
 * PayPal SDK Client Configuration
 * Sets up the PayPal environment based on configuration
 */

let environment: any;

if (config.paypal.mode === "production") {
  environment = new paypal.core.LiveEnvironment(
    config.paypal.clientId,
    config.paypal.clientSecret
  );
} else {
  environment = new paypal.core.SandboxEnvironment(
    config.paypal.clientId,
    config.paypal.clientSecret
  );
}

export const paypalClient = new paypal.core.PayPalHttpClient(environment);

/**
 * Get PayPal environment information
 */
export const getPayPalEnvironment = () => {
  return {
    mode: config.paypal.mode,
    baseUrl: environment.baseUrl,
  };
};
