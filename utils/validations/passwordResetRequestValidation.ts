import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

import { deleteFile } from '../../controllers/fileUpload/disk-storage';

export const passwordResetRequestValidation = [
	body('email')
		.isEmail()
		.withMessage('There is no email, or email is incorrect'),

	(req: Request, res: Response, next: () => void) => {
		const errors = validationResult(req);
		if (!errors.isEmpty() && req.file) {
			deleteFile(req.file.filename);
		}
		checkValidationError(req, res, next);
	},
];
