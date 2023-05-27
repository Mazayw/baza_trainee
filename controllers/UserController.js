import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/Users.js';

export const register = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email,
			name,
			passwordHash: hash,
		});

		const user = await doc.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			SECRET_KEY,
			{ expiresIn: '30d' }
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({ ...userData, token });
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: `Can't register`, error });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'Wrong username or password' });
		}
		const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
		if (!isValidPass) {
			return res.status(404).json({ message: 'Wrong username or password' });
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			SECRET_KEY,
			{ expiresIn: '30d' }
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({ ...userData, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't login`, error });
	}
};

export const getUserInfo = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const { passwordHash, ...userData } = user._doc;

		return res.json(userData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Access denied`, error });
	}
};
