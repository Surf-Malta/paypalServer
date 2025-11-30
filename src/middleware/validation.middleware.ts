import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './error.middleware';

/**
 * Validation result checker
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    throw new ValidationError(errorMessages);
  }
  
  next();
};

/**
 * Payment Order Validation Rules
 */
export const createOrderValidation = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),
  
  body('currency')
    .optional()
    .isString()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code'),
  
  body('description')
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage('Description must be less than 200 characters'),
  
  body('userData')
    .optional()
    .isObject()
    .withMessage('User data must be an object'),
  
  body('userData.email')
    .if(body('userData').exists())
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('userData.firstName')
    .if(body('userData').exists())
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be less than 50 characters'),
  
  body('userData.lastName')
    .if(body('userData').exists())
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be less than 50 characters'),
  
  body('userData.phone')
    .optional()
    .isString()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Invalid phone number format'),
  
  validate,
];

/**
 * Registration Completion Validation Rules
 */
export const completeRegistrationValidation = [
  body('orderId')
    .isString()
    .notEmpty()
    .withMessage('Order ID is required'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('firstName')
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required'),
  
  body('lastName')
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required'),
  
  body('phone')
    .optional()
    .isString()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Invalid phone number format'),
  
  validate,
];

/**
 * Order ID Parameter Validation
 */
export const orderIdValidation = [
  param('orderId')
    .isString()
    .notEmpty()
    .withMessage('Order ID is required'),
  
  validate,
];

/**
 * User ID Parameter Validation
 */
export const userIdValidation = [
  param('userId')
    .isUUID()
    .withMessage('Valid user ID is required'),
  
  validate,
];
