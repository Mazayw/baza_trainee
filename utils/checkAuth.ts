import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { config } from 'dotenv';
import { Response } from 'express';
import { IAuthenticatedRequest } from '../types';
config();
const { SECRET_KEY } = process.env;

export default (
	req: IAuthenticatedRequest,
	res: Response,
	next: () => void
) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

	if (token) {
		try {
			const decoded = jwt.verify(token, SECRET_KEY as Secret) as JwtPayload;
			req.userId = decoded._id;
			next();
		} catch (error) {
			return res.status(401).json({ message: 'The token is incorrect', error });
		}
	} else if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	} else {
		return res.status(500).json({ message: 'Oops, something went wrong' });
	}
};
