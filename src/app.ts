import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { corsMiddleware } from './middleware/cors.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import paymentRoutes from './routes/payment.routes';
import registrationRoutes from './routes/registration.routes';
import { config, isDevelopment } from './config/env.config';
import { getPayPalEnvironment } from './config/paypal.config';

/**
 * Express Application Setup
 */

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(corsMiddleware);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      paypal: getPayPalEnvironment(),
    },
  });
});

// API info endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      name: config.app.name,
      version: '1.0.0',
      description: 'PayPal Payment Gateway Server with Registration Integration',
      endpoints: {
        health: '/health',
        payments: '/api/payments',
        registration: '/api/registration',
      },
      documentation: 'See README.md for API documentation',
    },
  });
});

// API Routes
app.use('/api/payments', paymentRoutes);
app.use('/api/registration', registrationRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
