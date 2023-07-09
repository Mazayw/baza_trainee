import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';
import { fileValidation } from './fileValidation';
import { SETTINGS } from '../../settings';
import { deleteFile } from '../../controllers/fileUpload/disk-storage';

export const partnerCreateValidation = [
	body('imageUrl', 'Wrong image url').optional().isURL(),
	body('homeUrl', 'Wrong partner homepage url').optional().isURL(),
	body()
		.optional()
		.custom((_, { req }) => {
			if (req.file)
				return fileValidation(
					req.file,
					SETTINGS.fileSizeLimits.partnerLogo,
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
