import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';
import { deleteFile } from '../../controllers/fileUpload/disk-storage';
import { SETTINGS } from '../../settings';

const imageFileTypes = ['image/jpeg', 'image/png', 'image/webp'];

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
	body('file')
		.optional()
		.custom((_, { req }) => {
			const maxFileSize = SETTINGS.fileSizeLimits.heroSliderPhoto;
			if (!req.file) {
				throw new Error('No file was uploaded');
			}
			if (!imageFileTypes.includes(req.file.mimetype)) {
				deleteFile(req.file.filename);
				throw new Error(
					`The file type of ${req.file.originalname} should be an image (jpeg, png, webp).`
				);
			}

			if (req.file.size > maxFileSize) {
				throw new Error(
					`File size of ${req.file.originalname} exceeded the maximum limit of ${maxFileSize} bytes`
				);
			}

			return true;
		}),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
