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
	body(
		'name',
		'The name is incorrect, it must contain more than 2 character'
	).isLength({ min: 2 }),
	body(
		'review',
		'The review is incorrect, it must contain more than 20 character'
	).isLength({ min: 20 }),
	body('date', 'The date is incorrect, it must be number').isNumeric(),
	body('imageUrl', 'Wrong image url').isURL(),
	(req: Request, res: Response, next: () => void) =>
		checkValidation(req, res, next),
];
