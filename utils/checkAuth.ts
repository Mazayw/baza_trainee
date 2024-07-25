import { Response } from 'express';
import { IAuthenticatedRequest } from '../types';
import { verifyToken } from './tokenHandling';

export default (
	req: IAuthenticatedRequest,
	res: Response,
	next: () => void
) => {

	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
	
	if (token) {
		try {
			const decoded = verifyToken(token);
			req.userId = decoded._id;
			next();
		} catch (error) {
			console.log(error);
			return res.status(401).json({ message: 'The token is incorrect' });
		}
	} else if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	} else {
		return res.status(500).json({ message: 'Oops, something went wrong' });
	}
};
