import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const AchievementsValidation = [
	body('employed').isNumeric().withMessage('Employed must be a number'),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
