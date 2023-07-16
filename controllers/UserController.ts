import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/Users.js';
import { Request, Response } from 'express';
import { IAuthenticatedRequest } from '../types/index.js';
import { generateToken } from '../utils/tokenHandling.js';

export const register = async (req: Request, res: Response) => {
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

		const token = generateToken(String(user._id));

		const { ...userData } = user._doc;

		res.status(201).json({ ...userData, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't register`, error });
	}
};

export const login = async (req: Request, res: Response) => {
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

		const token = generateToken(String(user._id));

		const { ...userData } = user._doc;
		res.cookie('token', token, {
			httpOnly: true,
			//	secure: true
		});

		res.json({ ...userData, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't login`, error });
	}
};

export const getUserInfo = async (
	req: IAuthenticatedRequest,
	res: Response
) => {
	try {
		const user = await UserModel.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const { ...userData } = user._doc;

		return res.status(200).json(userData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Access denied`, error });
	}
};
