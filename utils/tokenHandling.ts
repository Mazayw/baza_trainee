import jwt from 'jsonwebtoken';
import { SETTINGS } from '../settings';
import { config } from 'dotenv';
config();
const SECRET_KEY = process.env.SECRET_KEY;

export const generateToken = (_id: string) => {
	const payload = { _id };
	const secretKey = SECRET_KEY || 'some secret key';
	const options = { expiresIn: SETTINGS.tokenExpiration };

	return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, SECRET_KEY || 'some secret key') as jwt.JwtPayload;
};
