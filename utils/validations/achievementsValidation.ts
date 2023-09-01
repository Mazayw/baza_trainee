import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

const isPositiveNumber = (value: unknown) =>
	typeof value === 'number' && value >= 0;

export const AchievementsValidation = [
	body('employed')
		.custom(isPositiveNumber)
		.withMessage('Employed must be a positive number'),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
