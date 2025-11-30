import { Router } from 'express';
import { registrationController } from '../controllers/registration.controller';
import {
  completeRegistrationValidation,
  userIdValidation,
} from '../middleware/validation.middleware';

const router = Router();

/**
 * Registration Routes
 */

// Complete registration after payment
router.post(
  '/complete',
  completeRegistrationValidation,
  registrationController.completeRegistration
);

// Get registration status by user ID
router.get(
  '/status/:userId',
  userIdValidation,
  registrationController.getRegistrationStatus
);

// Get registration by email
router.get('/email/:email', registrationController.getRegistrationByEmail);

// Update registration details
router.put(
  '/update/:userId',
  userIdValidation,
  registrationController.updateRegistration
);

// Cancel registration
router.delete(
  '/:userId',
  userIdValidation,
  registrationController.cancelRegistration
);

// Get all registrations (admin)
router.get('/all', registrationController.getAllRegistrations);

export default router;
