import { body } from 'express-validator';
import { Request, Response } from 'express';
import { checkValidationError } from './checkValidationError';

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
		checkValidationError(req, res, next),
];
