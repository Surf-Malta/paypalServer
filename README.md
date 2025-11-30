# PayPal Payment Gateway Server

A TypeScript-based Express server that integrates PayPal payments with user registration functionality. This server provides a complete payment processing solution with registration tracking.

## 🚀 Features

- ✅ PayPal SDK integration (Sandbox & Production)
- ✅ Payment order creation and capture
- ✅ User registration with payment validation
- ✅ Webhook support for payment notifications
- ✅ RESTful API with TypeScript
- ✅ Input validation and error handling
- ✅ CORS support for cross-origin requests
- ✅ In-memory storage (easily upgradeable to database)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PayPal Developer Account ([Sign up here](https://developer.paypal.com/))

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "e:\My Websites\paypalServer"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   copy .env.example .env
   ```

4. **Configure your `.env` file with PayPal credentials:**
   ```env
   NODE_ENV=development
   PORT=3000
   
   # Get these from https://developer.paypal.com/dashboard/applications/sandbox
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your_actual_client_id
   PAYPAL_CLIENT_SECRET=your_actual_client_secret
   
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
   REGISTRATION_FEE=29.99
   CURRENCY=USD
   ```

## 🔑 Getting PayPal Credentials

1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Log in or create an account
3. Navigate to **Apps & Credentials**
4. Under **Sandbox**, click **Create App**
5. Copy your **Client ID** and **Secret**
6. Paste them into your `.env` file

## 🚀 Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Build:
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```http
GET /health
```
Returns server health status and configuration info.

### Payment Endpoints

#### Create Payment Order
```http
POST /api/payments/create
Content-Type: application/json

{
  "amount": 29.99,
  "currency": "USD",
  "description": "Registration Payment",
  "userData": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "8XY12345ABC67890",
    "status": "CREATED",
    "amount": 29.99,
    "currency": "USD",
    "registrationId": "uuid-here",
    "approvalUrl": "https://www.sandbox.paypal.com/checkoutnow?token=..."
  }
}
```

#### Capture Payment
```http
POST /api/payments/capture/:orderId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "captureId": "9AB12345XYZ67890",
    "status": "COMPLETED",
    "amount": 29.99,
    "currency": "USD",
    "payerEmail": "user@example.com",
    "registrationId": "uuid-here"
  }
}
```

#### Get Order Details
```http
GET /api/payments/:orderId
```

### Registration Endpoints

#### Complete Registration
```http
POST /api/registration/complete
Content-Type: application/json

{
  "orderId": "8XY12345ABC67890",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Get Registration Status
```http
GET /api/registration/status/:userId
```

#### Get Registration by Email
```http
GET /api/registration/email/:email
```

#### Get All Registrations (Admin)
```http
GET /api/registration/all
```

## 🔄 Payment Flow

1. **Frontend creates payment order:**
   - Call `POST /api/payments/create` with amount and user data
   - Receive `approvalUrl` in response

2. **User approves payment:**
   - Redirect user to PayPal's `approvalUrl`
   - User logs in and approves payment

3. **Capture the payment:**
   - After approval, PayPal redirects back to your site
   - Call `POST /api/payments/capture/:orderId`
   - Registration is automatically completed

4. **Verify registration:**
   - Call `GET /api/registration/status/:userId`
   - Check registration and payment status

## 🌐 Frontend Integration Example

```javascript
// Step 1: Create payment order
const createPayment = async () => {
  const response = await fetch('http://localhost:3000/api/payments/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: 29.99,
      currency: 'USD',
      userData: {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    })
  });
  
  const data = await response.json();
  
  // Redirect to PayPal
  window.location.href = data.data.approvalUrl;
};

// Step 2: Capture payment (after redirect back)
const capturePayment = async (orderId) => {
  const response = await fetch(`http://localhost:3000/api/payments/capture/${orderId}`, {
    method: 'POST'
  });
  
  const data = await response.json();
  console.log('Payment captured:', data);
};
```

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation with express-validator
- Error handling middleware
- Environment variable validation

## 📝 Project Structure

```
paypalServer/
├── src/
│   ├── config/
│   │   ├── env.config.ts       # Environment configuration
│   │   └── paypal.config.ts    # PayPal SDK setup
│   ├── controllers/
│   │   ├── payment.controller.ts
│   │   └── registration.controller.ts
│   ├── middleware/
│   │   ├── cors.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/
│   │   ├── payment.routes.ts
│   │   └── registration.routes.ts
│   ├── services/
│   │   ├── paypal.service.ts
│   │   └── registration.service.ts
│   ├── types/
│   │   └── payment.types.ts
│   ├── app.ts                  # Express app setup
│   └── server.ts               # Server entry point
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `PAYPAL_MODE` | PayPal environment | `sandbox` |
| `PAYPAL_CLIENT_ID` | PayPal Client ID | Required |
| `PAYPAL_CLIENT_SECRET` | PayPal Secret | Required |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |
| `REGISTRATION_FEE` | Default registration fee | `29.99` |
| `CURRENCY` | Default currency | `USD` |

## 🚀 Deployment

### Production Checklist

1. ✅ Set `NODE_ENV=production`
2. ✅ Set `PAYPAL_MODE=production`
3. ✅ Use production PayPal credentials
4. ✅ Configure proper `ALLOWED_ORIGINS`
5. ✅ Set up database (replace in-memory storage)
6. ✅ Configure webhook URL in PayPal Dashboard
7. ✅ Enable HTTPS
8. ✅ Set up monitoring and logging

### Deploying to Cloud Platforms

**Heroku:**
```bash
heroku create your-app-name
heroku config:set PAYPAL_CLIENT_ID=your_id
heroku config:set PAYPAL_CLIENT_SECRET=your_secret
git push heroku main
```

**Vercel/Railway/Render:**
- Set environment variables in dashboard
- Deploy from GitHub repository

## 🗄️ Database Integration

The server currently uses in-memory storage. To integrate a database:

1. Install database driver (e.g., `mongoose`, `pg`, `mysql2`)
2. Update `src/services/registration.service.ts`
3. Replace Map storage with database queries
4. Add database connection in `src/config/`

## 🐛 Troubleshooting

### Common Issues

**"PAYPAL_CLIENT_ID is required"**
- Make sure you've created a `.env` file
- Copy values from `.env.example`
- Add your actual PayPal credentials

**CORS errors**
- Add your frontend URL to `ALLOWED_ORIGINS` in `.env`

**Payment capture fails**
- Ensure the order was approved by the user
- Check PayPal sandbox account status
- Verify credentials are correct

## 📚 Resources

- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal Node.js SDK](https://github.com/paypal/Checkout-NodeJS-SDK)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 📄 License

ISC

## 🤝 Support

For issues or questions, please check:
- PayPal Developer Forums
- Project documentation
- API endpoint responses for error details

---

**Made with ❤️ using TypeScript, Express, and PayPal SDK**
