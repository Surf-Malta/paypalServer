import app from './app';
import { config } from './config/env.config';

/**
 * Server Entry Point
 */

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 ${config.app.name}`);
  console.log('='.repeat(50));
  console.log(`📍 Server running on: ${config.app.url}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`💳 PayPal Mode: ${config.paypal.mode}`);
  console.log(`💰 Registration Fee: ${config.registration.currency} ${config.registration.fee}`);
  console.log('='.repeat(50));
  console.log('\n📚 Available Endpoints:');
  console.log(`   GET  /health - Health check`);
  console.log(`   GET  / - API information`);
  console.log(`   POST /api/payments/create - Create payment order`);
  console.log(`   POST /api/payments/capture/:orderId - Capture payment`);
  console.log(`   GET  /api/payments/:orderId - Get order details`);
  console.log(`   POST /api/registration/complete - Complete registration`);
  console.log(`   GET  /api/registration/status/:userId - Get registration status`);
  console.log('\n✅ Server is ready to accept requests!\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // In production, you might want to exit the process
  // process.exit(1);
});

export default server;
