import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const roleCreateValidation = [
	body('name.en')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The en name is incorrect, it must contain more than 5 characters'
		),
	body('name.pl')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The pl name is incorrect, it must contain more than 5 characters'
		),
	body('name.ua')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The ua name is incorrect, it must contain more than 5 characters'
		),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
