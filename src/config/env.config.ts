import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config();

interface EnvConfig {
  nodeEnv: string;
  port: number;
  paypal: {
    mode: "sandbox" | "production" | "live";
    clientId: string;
    clientSecret: string;
  };
  cors: {
    allowedOrigins: string[];
  };
  app: {
    name: string;
    url: string;
  };
  registration: {
    fee: number;
    currency: string;
  };
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value;
};

const getEnvVarOptional = (key: string, defaultValue: string): string => {
  return process.env[key] || defaultValue;
};

export const config: EnvConfig = {
  nodeEnv: getEnvVarOptional("NODE_ENV", "development"),
  port: parseInt(getEnvVarOptional("PORT", "3000"), 10),

  paypal: {
    mode: getEnvVarOptional("PAYPAL_MODE", "sandbox") as
      | "sandbox"
      | "production"
      | "live",
    clientId: getEnvVar("PAYPAL_CLIENT_ID", "PLACEHOLDER_CLIENT_ID"),
    clientSecret: getEnvVar(
      "PAYPAL_CLIENT_SECRET",
      "PLACEHOLDER_CLIENT_SECRET"
    ),
  },

  cors: {
    allowedOrigins: getEnvVarOptional(
      "ALLOWED_ORIGINS",
      "http://localhost:3000,http://localhost:5173,https://surf-seller-page-admin-panel.vercel.app,https://surf-seller-page.vercel.app,https://sell.surf.mt,https://surf-seller-page-kappa.vercel.app"
    )
      .split(",")
      .map((origin) => origin.trim()),
  },

  app: {
    name: getEnvVarOptional("APP_NAME", "PayPal Payment Server"),
    url: getEnvVarOptional("APP_URL", "http://localhost:3000"),
  },

  registration: {
    fee: parseFloat(getEnvVarOptional("REGISTRATION_FEE", "29.99")),
    currency: getEnvVarOptional("CURRENCY", "USD"),
  },
};

export const isDevelopment = config.nodeEnv === "development";
export const isProduction = config.nodeEnv === "production";
