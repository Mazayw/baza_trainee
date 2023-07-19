import { body } from 'express-validator';
import { Request, Response } from 'express';

import { checkValidationError } from './checkValidationError';

export const ContactsValidation = [
	body('contactsDataList.phone1')
		.optional()
		.isNumeric()
		.matches(/^380\d{9}$/)
		.withMessage('Phone1 must be a number'),
	body('contactsDataList.phone2')
		.optional()
		.isNumeric()
		.matches(/^380\d{9}$/)
		.withMessage('Phone2 must be a number'),
	body('contactsDataList.email')
		.optional()
		.isEmail()
		.withMessage('Invalid email address'),
	body('socialsMediaList.linkedin')
		.optional()
		.isURL()
		.withMessage('Invalid LinkedIn URL'),
	body('socialsMediaList.facebook')
		.optional()
		.isURL()
		.withMessage('Invalid Facebook URL'),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
