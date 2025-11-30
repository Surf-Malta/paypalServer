import { Request, Response } from 'express';
import { registrationService } from '../services/registration.service';
import { paypalService } from '../services/paypal.service';
import { asyncHandler } from '../middleware/error.middleware';
import { NotFoundError, ValidationError } from '../middleware/error.middleware';
import { ApiResponse, UserRegistrationData } from '../types/payment.types';

/**
 * Registration Controller
 * Handles user registration operations
 */

export class RegistrationController {
  /**
   * Complete registration after successful payment
   * POST /api/registration/complete
   */
  completeRegistration = asyncHandler(async (req: Request, res: Response) => {
    const { orderId, email, firstName, lastName, phone, address, metadata } = req.body;

    // Verify the payment was successful
    const orderDetails = await paypalService.getOrderDetails(orderId);
    
    if (orderDetails.status !== 'COMPLETED' && orderDetails.status !== 'APPROVED') {
      throw new ValidationError('Payment has not been completed');
    }

    // Check if registration already exists for this payment
    let registration = await registrationService.getRegistrationByPaymentId(orderId);

    if (!registration) {
      // Create new registration
      const userData: UserRegistrationData = {
        email,
        firstName,
        lastName,
        phone,
        address,
        metadata,
      };

      const amount = parseFloat(orderDetails.purchase_units[0].amount.value);
      const currency = orderDetails.purchase_units[0].amount.currency_code;

      registration = await registrationService.createRegistration(
        userData,
        orderId,
        amount,
        currency
      );
    }

    // Complete the registration
    const completedRegistration = await registrationService.completeRegistration(
      registration.id,
      'completed'
    );

    const response: ApiResponse = {
      success: true,
      data: {
        registrationId: completedRegistration.id,
        userId: completedRegistration.userId,
        email: completedRegistration.email,
        status: completedRegistration.registrationStatus,
        completedAt: completedRegistration.completedAt,
      },
    };

    res.status(200).json(response);
  });

  /**
   * Get registration status
   * GET /api/registration/status/:userId
   */
  getRegistrationStatus = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const registration = await registrationService.getRegistrationByUserId(userId);

    if (!registration) {
      throw new NotFoundError('Registration not found');
    }

    const response: ApiResponse = {
      success: true,
      data: {
        userId: registration.userId,
        email: registration.email,
        registrationStatus: registration.registrationStatus,
        paymentStatus: registration.paymentStatus,
        createdAt: registration.createdAt,
        completedAt: registration.completedAt,
      },
    };

    res.status(200).json(response);
  });

  /**
   * Get registration by email
   * GET /api/registration/email/:email
   */
  getRegistrationByEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;

    const registration = await registrationService.getRegistrationByEmail(email);

    if (!registration) {
      throw new NotFoundError('Registration not found');
    }

    const response: ApiResponse = {
      success: true,
      data: {
        userId: registration.userId,
        email: registration.email,
        firstName: registration.firstName,
        lastName: registration.lastName,
        registrationStatus: registration.registrationStatus,
        paymentStatus: registration.paymentStatus,
        createdAt: registration.createdAt,
        completedAt: registration.completedAt,
      },
    };

    res.status(200).json(response);
  });

  /**
   * Update registration details
   * PUT /api/registration/update/:userId
   */
  updateRegistration = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const updates = req.body;

    const registration = await registrationService.getRegistrationByUserId(userId);

    if (!registration) {
      throw new NotFoundError('Registration not found');
    }

    const updatedRegistration = await registrationService.updateRegistration(
      registration.id,
      updates
    );

    const response: ApiResponse = {
      success: true,
      data: updatedRegistration,
    };

    res.status(200).json(response);
  });

  /**
   * Cancel registration
   * DELETE /api/registration/:userId
   */
  cancelRegistration = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const registration = await registrationService.getRegistrationByUserId(userId);

    if (!registration) {
      throw new NotFoundError('Registration not found');
    }

    const cancelledRegistration = await registrationService.cancelRegistration(
      registration.id
    );

    const response: ApiResponse = {
      success: true,
      data: {
        userId: cancelledRegistration.userId,
        status: cancelledRegistration.registrationStatus,
      },
    };

    res.status(200).json(response);
  });

  /**
   * Get all registrations (admin)
   * GET /api/registration/all
   */
  getAllRegistrations = asyncHandler(async (req: Request, res: Response) => {
    const registrations = await registrationService.getAllRegistrations();

    const response: ApiResponse = {
      success: true,
      data: {
        count: registrations.length,
        registrations: registrations.map(reg => ({
          userId: reg.userId,
          email: reg.email,
          firstName: reg.firstName,
          lastName: reg.lastName,
          status: reg.registrationStatus,
          paymentStatus: reg.paymentStatus,
          amount: reg.amount,
          createdAt: reg.createdAt,
        })),
      },
    };

    res.status(200).json(response);
  });
}

export const registrationController = new RegistrationController();
