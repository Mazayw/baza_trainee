import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const registerValidation = [
	body('email', 'Wrong email').isEmail(),
	body(
		'password',
		'The password is incorrect, it must contain more than 5 characters'
	).isLength({ min: 5 }),
	body(
		'name',
		'The name is incorrect, it must contain more than 3 characters'
	).isLength({ min: 3 }),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
