import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';

const checkValidation = (req: Request, res: Response, next: () => void) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log('Validation failed:', errors.array());
		return res.status(400).json(errors.array());
	}
	next();
};

export const registerValidation = [
	body('email', 'Wrong email').isEmail(),
	body(
		'password',
		'The password is incorrect, it must contain more than 5 characters'
	).isLength({ min: 5 }),
	body(
		'name',
		'The name is incorrect, it must contain more than 3 characters'
	).isLength({ min: 3 }),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

export const loginValidation = [
	body('email', 'Wrong email').isEmail(),
	body(
		'password',
		'The password is incorrect, it must contain more than 5 characters'
	).isLength({ min: 5 }),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

export const partnerCreateValidation = [
	body(
		'name',
		'The name is incorrect, it must contain more than 1 character'
	).isLength({ min: 1 }),
	body('imageUrl', 'Wrong image url').isURL(),
	body('homeUrl', 'Wrong partner homepage url').isURL(),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

export const projectCreateValidation = [
	body('imageUrl').isURL({ require_tld: false, require_host: false }), //isURL(),
	body('status').isString(), //isIn(['active', 'inactive']),
	body('description').isString(),
	body('creationDate').isNumeric(),
	body('launchDate').isNumeric(),
	body('complexity').isInt({ min: 1, max: 5 }),
	body('teamMembers')
		.isArray({ min: 1 })
		.custom((value) => {
			if (Array.isArray(value)) {
				for (const member of value) {
					if (typeof member !== 'object' || !member.userId || !member.roleId) {
						throw new Error('Invalid team member object');
					}
				}
				return true;
			}
			throw new Error('Invalid teamMembers value');
		}),
	body('title').isString().notEmpty(),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

export const roleCreateValidation = [
	body(
		'name',
		'The name is incorrect, it must contain more than 2 character'
	).isLength({ min: 2 }),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

export const TeamMembersValidation = [
	body(
		'name',
		'The name is incorrect, it must contain more than 2 character'
	).isLength({ min: 2 }),
	body('profileUrl', 'Wrong profile url').isURL(),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

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
		checkValidation(req, res, next),
];

export const ContactsValidation = [
	body('contacts.contactsDataList.phone1')
		.isNumeric()
		.matches(/^380\d{9}$/)
		.withMessage('Phone1 must be a number'),
	body('contacts.contactsDataList.phone2')
		.isNumeric()
		.matches(/^380\d{9}$/)
		.withMessage('Phone2 must be a number'),
	body('contacts.contactsDataList.email')
		.isEmail()
		.withMessage('Invalid email address'),
	body('contacts.socialsMediaList.linkedin')
		.isURL()
		.withMessage('Invalid LinkedIn URL'),
	body('contacts.socialsMediaList.facebook')
		.isURL()
		.withMessage('Invalid Facebook URL'),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];
