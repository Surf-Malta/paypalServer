export interface CreateOrderRequest {
  amount: number;
  currency?: string;
  description?: string;
  returnUrl?: string;
  cancelUrl?: string;
  userData?: UserRegistrationData;
}

export interface UserRegistrationData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  metadata?: Record<string, any>;
}

export interface PaymentOrder {
  id: string;
  status: string;
  amount: number;
  currency: string;
  description?: string;
  createdAt: Date;
  userData?: UserRegistrationData;
  paypalOrderId?: string;
}

export interface CaptureOrderRequest {
  orderId: string;
}

export interface PaymentCapture {
  id: string;
  status: string;
  amount: number;
  currency: string;
  payerId?: string;
  payerEmail?: string;
  capturedAt: Date;
}

export interface RegistrationRecord {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: UserRegistrationData['address'];
  paymentId: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  registrationStatus: 'pending' | 'active' | 'cancelled';
  amount: number;
  currency: string;
  createdAt: Date;
  completedAt?: Date;
  metadata?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

export interface PayPalWebhookEvent {
  id: string;
  event_type: string;
  resource_type: string;
  resource: any;
  create_time: string;
}
