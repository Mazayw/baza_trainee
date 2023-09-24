import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const changePasswordValidation = [
	body('oldPassword')
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'There is no old password, or old password is less than 5 characters'
		),
	body('newPassword')
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'There is no new password, or new password is less than 5 characters'
		),

	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
