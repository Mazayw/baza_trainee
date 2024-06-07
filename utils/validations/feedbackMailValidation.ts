import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const feedbackMailValidation = [
  body('name')
    .isString()
    .isLength({ min: 4 })
    .withMessage('There is no name, or name is less than 4 characters'),
  body('email')
    .isString()
    .isEmail()
    .withMessage('There is no email, or email is incorrect'),
  body('text')
    .isString()
    .isLength({ max: 300, min: 10 })
    .withMessage(
      'There is no text, or text is more than 300 or less than 10 characters'
    ),

  (req: Request, res: Response, next: () => void) =>
    checkValidationError(req, res, next),
];
