import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';
import { SETTINGS } from '../../settings';
import { fileValidation } from './fileValidation';
import { deleteFile } from '../../controllers/fileUpload/disk-storage';

export const HeroSliderValidation = [
	body('title.en')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The en title is incorrect, it must contain more than 5 characters'
		),
	body('title.pl')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The pl title is incorrect, it must contain more than 5 characters'
		),
	body('title.ua')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The ua title is incorrect, it must contain more than 5 characters'
		),
	body('subtitle.en')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The en subtitle is incorrect, it must contain more than 5 characters'
		),
	body('subtitle.pl')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The pl subtitle is incorrect, it must contain more than 5 characters'
		),
	body('subtitle.ua')
		.optional()
		.isString()
		.isLength({ min: 5 })
		.withMessage(
			'The ua subtitle is incorrect, it must contain more than 5 characters'
		),
	body('imageUrl', 'Wrong image url').optional().notEmpty().isString().isURL(), //fix it
	body()
		.optional()
		.custom((_, { req }) => {
			if (req.file)
				return fileValidation(
					req.file,
					SETTINGS.fileSizeLimits.heroSliderPhoto,
					'image'
				);
		}),
	(req: Request, res: Response, next: () => void) => {
		const errors = validationResult(req);
		if (!errors.isEmpty() && req.file) {
			deleteFile(req.file.filename);
		}
		checkValidationError(req, res, next);
	},
];
