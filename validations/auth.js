import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'wrong email').isEmail(),
	body(
		'password',
		'The password is incorrect, it must contain more than 5 characters'
	).isLength({ min: 5 }),
	body(
		'name',
		'The name is incorrect, it must contain more than 3 characters'
	).isLength({ min: 3 }),
];
