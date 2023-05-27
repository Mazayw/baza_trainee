import { body, validationResult } from 'express-validator';

const checkValidation = (req, res, next) => {
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
	(req, res, next) => checkValidation(req, res, next),
];

export const loginValidation = [
	body('email', 'Wrong email').isEmail(),
	body(
		'password',
		'The password is incorrect, it must contain more than 5 characters'
	).isLength({ min: 5 }),
	(req, res, next) => checkValidation(req, res, next),
];

export const partnerCreateValidation2 = [
	body(
		'name',
		'The name is incorrect, it must contain more than 1 character'
	).isLength({ min: 1 }),
	body('imageUrl', 'Wrong image url').isURL(),
	body('homeUrl', 'Wrong partner homepage url').isURL(),
	(req, res, next) => checkValidation(req, res, next),
];

export const partnerCreateValidation = [
	body(
		'name',
		'The name is incorrect, it must contain more than 1 character'
	).isLength({ min: 1 }),
	body('imageUrl', 'Wrong image url').isURL(),
	body('homeUrl', 'Wrong partner homepage url').isURL(),
	(req, res, next) => checkValidation(req, res, next),
];

export const roleCreateValidation = [
	body(
		'name',
		'The name is incorrect, it must contain more than 2 character'
	).isLength({ min: 2 }),
	(req, res, next) => checkValidation(req, res, next),
];

export const TeamMembersValidation = [
	body(
		'name',
		'The name is incorrect, it must contain more than 2 character'
	).isLength({ min: 2 }),
	body('profileUrl', 'Wrong profile url').isURL(),
	(req, res, next) => checkValidation(req, res, next),
];
