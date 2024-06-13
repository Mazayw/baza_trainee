import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const mentorFormValidation = [
  body('firstName', 'Wrong first name').isString().isLength({ min: 3 }),
  body('lastName', 'Wrong last name').isString().isLength({ min: 3 }),
  body('email', 'Wrong email').isEmail(),
  body('phone', 'Wrong phone').isString(),
  body('discord', 'Wrong discord').isString(),
  body('linkedin', 'Wrong linkedin').isString(),
  body('specialization', 'Wrong specialization')
    .isString()
    .isLength({ min: 5 }),
  body('convenient_time', 'Wrong convenient time').isString(),
  (req: Request, res: Response, next: () => void) =>
    checkValidationError(req, res, next),
];
