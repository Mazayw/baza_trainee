import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

export const checkValidationError = (
	req: Request,
	res: Response,
	next: () => void
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log('Validation failed:', errors.array());
		return res
			.status(400)
			.json({ message: 'Validation error(s)', errors: errors.array() });
	}
	next();
};
