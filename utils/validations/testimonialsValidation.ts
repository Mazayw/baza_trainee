import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

export const TestimonialsValidation = [
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
	body('review.en')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The en review is incorrect, it must contain more than 5 characters'
		),
	body('review.pl')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The pl review is incorrect, it must contain more than 5 characters'
		),
	body('review.ua')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The ua review is incorrect, it must contain more than 5 characters'
		),
	body('date')
		.optional()
		.if(body('date').exists())
		.isNumeric()
		.withMessage('The date is incorrect, it must be a number'),
	body('imageUrl', 'Wrong image url').optional().notEmpty().isString().isURL(),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
