import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { config } from 'dotenv';
import { Request, Response } from 'express';
config();
const { SECRET_KEY } = process.env;
interface AuthenticatedRequest extends Request {
	userId?: string;
}

export default (req: AuthenticatedRequest, res: Response, next: () => void) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

	if (token) {
		try {
			const decoded = jwt.verify(token, SECRET_KEY as Secret) as JwtPayload;
			req.userId = decoded._id;
			next();
		} catch (error) {
			return res.status(403).json({ message: 'The token is incorrect', error });
		}
	} else {
		return res.status(403).json({ message: 'Oops, something went wrong' });
	}
};
