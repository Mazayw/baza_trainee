import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const passwordResetRequestValidation = [
	body('email')
		.isEmail()
		.withMessage('There is no email, or email is incorrect'),

	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
