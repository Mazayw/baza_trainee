import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const partnerCreateValidation = [
	body('imageUrl', 'Wrong image url').optional().isURL(),
	body('homeUrl', 'Wrong partner homepage url').optional().isURL(),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
