import { body } from 'express-validator';

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
];

export const loginValidation = [
	body('email', 'Wrong email').isEmail(),
	body(
		'password',
		'The password is incorrect, it must contain more than 5 characters'
	).isLength({ min: 5 }),
];

export const partnerCreateValidation = [
	body('imageUrl', 'Wrong image url').optional().isURL(),
	body('homeUrl', 'Wrong partner homepage url').optional().isURL(),
	body(
		'name',
		'The name is incorrect, it must contain more than 1 character'
	).isLength({ min: 1 }),
];
