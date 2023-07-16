import jwt from 'jsonwebtoken';
import { SETTINGS } from '../settings';
const SECRET_KEY = process.env.SECRET_KEY;

export const generateToken = (_id: string) => {
	const payload = { _id };
	const secretKey = SECRET_KEY || 'some secret key';
	const options = { expiresIn: SETTINGS.tokenExpiration };

	return jwt.sign(payload, secretKey, options);
};
