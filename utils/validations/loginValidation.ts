import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const loginValidation = [
	body('email', 'Wrong email').isEmail(),
	body(
		'password',
		'The password is incorrect, it must contain more than 5 characters'
	).isLength({ min: 5 }),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
