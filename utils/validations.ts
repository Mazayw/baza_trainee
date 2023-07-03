import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { SETTINGS } from '../settings';

const checkValidation = (req: Request, res: Response, next: () => void) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log('Validation failed:', errors.array());
		return res
			.status(400)
			.json({ message: 'Validation error(s)', errors: errors.array() });
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
	body('imageUrl', 'Wrong image url').optional().isURL(),
	body('homeUrl', 'Wrong partner homepage url').optional().isURL(),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

export const projectCreateValidation = [
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
	body('imageUrl')
		.optional()
		.isURL({ require_tld: false, require_host: false }),
	body('stack')
		.optional()
		.isArray({ min: 1 })
		.withMessage('At least one stack object is required')
		.custom((value) => {
			if (Array.isArray(value)) {
				for (const stack of value) {
					if (typeof stack !== 'object' || !stack.stackId) {
						throw new Error('Invalid stack object');
					}
				}
				return true;
			}
			throw new Error('Invalid stack value');
		}),
	body('isTeamRequired')
		.optional()
		.isBoolean()
		.withMessage('isTeamRequired must be a boolean'),
	body('creationDate')
		.optional()
		.isNumeric()
		.withMessage('Creation date must be a number'),
	body('launchDate')
		.optional()
		.isNumeric()
		.withMessage('Launch date must be a number'),
	body('complexity')
		.optional()
		.isNumeric()
		.withMessage('Complexity must be a number'),
	body('teamMembers')
		.optional()
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
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

export const roleCreateValidation = [
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
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

export const TeamMembersValidation = [
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
	body('profileUrl', 'Wrong profile url').optional().isURL(),
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
	body('imageUrl', 'Wrong image url').optional().notEmpty().isString().isURL(),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

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
		checkValidation(req, res, next),
];

export const stackCreateValidation = [
	body('name')
		.optional()
		.isString()
		.isLength({ min: 1 })
		.withMessage(
			'The name is incorrect, it must contain more than 1 characters'
		),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

export const AchievementsValidation = [
	body('employed').isNumeric().withMessage('Employed must be a number'),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];

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
		checkValidation(req, res, next),
];
