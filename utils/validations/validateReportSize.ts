import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';
import { SETTINGS } from '../../settings';

const documentFileTypes = ['application/pdf'];

export const validateReportSize = [
	body().custom((_, { req }) => {
		if (!req.files || !req.files.length) {
			throw new Error('No files were uploaded');
		}

		req.files.forEach((file: Express.Multer.File) => {
			if (file.size > SETTINGS.fileSizeLimits.report) {
				throw new Error(
					`File size of ${file.filename} exceeded the maximum limit of ${SETTINGS.fileSizeLimits.report} bytes`
				);
			}
		});

		return true;
	}),

	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
