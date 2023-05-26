import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const { SECRET_KEY } = process.env;

export default (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

	if (token) {
		try {
			const decoded = jwt.verify(token, SECRET_KEY);
			req.userId = decoded._id;
			next();
		} catch (error) {
			return res.status(403).json({ message: 'The token is incorrect', error });
		}
	} else {
		return res.status(403).json({ message: 'Oops, something went wrong' });
	}
};
