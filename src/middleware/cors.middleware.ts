import cors from 'cors';
import { config } from '../config/env.config';

/**
 * CORS Configuration
 * Allows cross-origin requests from specified origins
 */

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Normalize origin by removing trailing slash
    const normalizedOrigin = origin.replace(/\/$/, "");

    // Check if origin is in allowed list
    const isAllowed = config.cors.allowedOrigins.some(allowed => {
      // Strip potential key prefix "ALLOWED_ORIGINS=" and trailing slashes
      const normalizedAllowed = allowed
        .replace(/^ALLOWED_ORIGINS=/, "")
        .replace(/\/$/, "");
      return normalizedAllowed === "*" || normalizedAllowed === normalizedOrigin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`CORS REJECTION: Normalized Origin "${normalizedOrigin}" is not in whitelist:`, config.cors.allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
};

export const corsMiddleware = cors(corsOptions);
