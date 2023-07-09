import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';
import { SETTINGS } from '../../settings';
import { fileValidation } from './fileValidation';
import { deleteFile } from '../../controllers/fileUpload/disk-storage';

export const validateReportSize = [
	body().custom((_, { req }) => {
		req.files.forEach((file: Express.Multer.File) => {
			fileValidation(file, SETTINGS.fileSizeLimits.report, 'document');
		});

		return true;
	}),

	(req: Request, res: Response, next: () => void) => {
		const errors = validationResult(req);
		if (!errors.isEmpty() && req.files?.length) {
			(req.files as Express.Multer.File[]).forEach(
				(file: Express.Multer.File) => {
					deleteFile(file.filename);
				}
			);
		}
		checkValidationError(req, res, next);
	},
];
