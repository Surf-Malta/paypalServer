import { v4 as uuidv4 } from 'uuid';
import { RegistrationRecord, UserRegistrationData } from '../types/payment.types';

/**
 * Registration Service
 * Handles user registration and payment tracking
 * Using in-memory storage (can be replaced with database)
 */

class RegistrationService {
  private registrations: Map<string, RegistrationRecord> = new Map();
  private emailIndex: Map<string, string> = new Map(); // email -> userId mapping

  /**
   * Create a new registration record
   */
  async createRegistration(
    userData: UserRegistrationData,
    paymentId: string,
    amount: number,
    currency: string
  ): Promise<RegistrationRecord> {
    const userId = uuidv4();
    
    const registration: RegistrationRecord = {
      id: uuidv4(),
      userId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address,
      paymentId,
      paymentStatus: 'pending',
      registrationStatus: 'pending',
      amount,
      currency,
      createdAt: new Date(),
      metadata: userData.metadata,
    };

    this.registrations.set(registration.id, registration);
    this.emailIndex.set(userData.email.toLowerCase(), registration.id);

    return registration;
  }

  /**
   * Complete registration after successful payment
   */
  async completeRegistration(
    registrationId: string,
    paymentStatus: 'completed' | 'failed'
  ): Promise<RegistrationRecord> {
    const registration = this.registrations.get(registrationId);
    
    if (!registration) {
      throw new Error('Registration not found');
    }

    registration.paymentStatus = paymentStatus;
    registration.registrationStatus = paymentStatus === 'completed' ? 'active' : 'pending';
    
    if (paymentStatus === 'completed') {
      registration.completedAt = new Date();
    }

    this.registrations.set(registrationId, registration);
    return registration;
  }

  /**
   * Get registration by ID
   */
  async getRegistrationById(registrationId: string): Promise<RegistrationRecord | null> {
    return this.registrations.get(registrationId) || null;
  }

  /**
   * Get registration by user ID
   */
  async getRegistrationByUserId(userId: string): Promise<RegistrationRecord | null> {
    for (const registration of this.registrations.values()) {
      if (registration.userId === userId) {
        return registration;
      }
    }
    return null;
  }

  /**
   * Get registration by email
   */
  async getRegistrationByEmail(email: string): Promise<RegistrationRecord | null> {
    const registrationId = this.emailIndex.get(email.toLowerCase());
    if (!registrationId) {
      return null;
    }
    return this.registrations.get(registrationId) || null;
  }

  /**
   * Get registration by payment ID
   */
  async getRegistrationByPaymentId(paymentId: string): Promise<RegistrationRecord | null> {
    for (const registration of this.registrations.values()) {
      if (registration.paymentId === paymentId) {
        return registration;
      }
    }
    return null;
  }

  /**
   * Update registration details
   */
  async updateRegistration(
    registrationId: string,
    updates: Partial<RegistrationRecord>
  ): Promise<RegistrationRecord> {
    const registration = this.registrations.get(registrationId);
    
    if (!registration) {
      throw new Error('Registration not found');
    }

    const updatedRegistration = { ...registration, ...updates };
    this.registrations.set(registrationId, updatedRegistration);
    
    return updatedRegistration;
  }

  /**
   * Cancel registration
   */
  async cancelRegistration(registrationId: string): Promise<RegistrationRecord> {
    const registration = this.registrations.get(registrationId);
    
    if (!registration) {
      throw new Error('Registration not found');
    }

    registration.registrationStatus = 'cancelled';
    this.registrations.set(registrationId, registration);
    
    return registration;
  }

  /**
   * Get all registrations (for admin purposes)
   */
  async getAllRegistrations(): Promise<RegistrationRecord[]> {
    return Array.from(this.registrations.values());
  }

  /**
   * Get active registrations count
   */
  async getActiveRegistrationsCount(): Promise<number> {
    let count = 0;
    for (const registration of this.registrations.values()) {
      if (registration.registrationStatus === 'active') {
        count++;
      }
    }
    return count;
  }
}

export const registrationService = new RegistrationService();
