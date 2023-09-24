import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const resetPasswordValidation = [
	body('userId')
		.isString()
		.isLength({ min: 5 })
		.withMessage('There is no email, or email is incorrect'),
	body('token')
		.isString()
		.withMessage('There is no token, or token is incorrect'),
	body('password')
		.isString()
		.isLength({ min: 5 })
		.withMessage('There is no password, or password is less than 5 characters'),

	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
