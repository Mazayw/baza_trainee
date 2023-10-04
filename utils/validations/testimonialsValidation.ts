import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';
import { SETTINGS } from '../../settings';
import { fileValidation } from './fileValidation';
import { deleteFile } from '../../controllers/fileUpload/disk-storage';

export const TestimonialsValidation = [
	body('name.en')
		.optional()
		.isString()
		.isLength({ min: 2 })
		.withMessage(
			'The en name is incorrect, it must contain more than 2 characters'
		),
	body('name.pl')
		.optional()
		.isString()
		.isLength({ min: 2 })
		.withMessage(
			'The pl name is incorrect, it must contain more than 2 characters'
		),
	body('name.ua')
		.optional()
		.isString()
		.isLength({ min: 2 })
		.withMessage(
			'The ua name is incorrect, it must contain more than 2 characters'
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
	body('role')
		.optional()
		.isString()
		.isLength({ min: 2 })
		.withMessage(
			'The role is incorrect, it must contain more than 2 characters'
		),
	body('date')
		.optional()
		.isInt()
		.withMessage('The date is incorrect, it must be a number'),
	body('imageUrl', 'Wrong image url').optional().notEmpty().isString().isURL(),
	body()
		.optional()
		.custom((_, { req }) => {
			if (req.file)
				return fileValidation(
					req.file,
					SETTINGS.fileSizeLimits.testimonialPhoto,
					'image'
				);
			return true;
		}),
	(req: Request, res: Response, next: () => void) => {
		const errors = validationResult(req);
		if (!errors.isEmpty() && req.file) {
			deleteFile(req.file.filename);
		}
		checkValidationError(req, res, next);
	},
];
