import { body } from 'express-validator';
import { Request, Response } from 'express';

import { checkValidationError } from './checkValidationError';

export const ContactsValidation = [
	body('contacts.contactsDataList.phone1')
		.optional()
		.isNumeric()
		.matches(/^380\d{9}$/)
		.withMessage('Phone1 must be a number'),
	body('contacts.contactsDataList.phone2')
		.optional()
		.isNumeric()
		.matches(/^380\d{9}$/)
		.withMessage('Phone2 must be a number'),
	body('contacts.contactsDataList.email')
		.optional()
		.isEmail()
		.withMessage('Invalid email address'),
	body('contacts.socialsMediaList.linkedin')
		.optional()
		.isURL()
		.withMessage('Invalid LinkedIn URL'),
	body('contacts.socialsMediaList.facebook')
		.optional()
		.isURL()
		.withMessage('Invalid Facebook URL'),
	(req: Request, res: Response, next: () => void) =>
		checkValidationError(req, res, next),
];
