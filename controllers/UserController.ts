import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/Users.js';
import { Request, Response } from 'express';
import { IAuthenticatedRequest } from '../types/index.js';
import { generateToken } from '../utils/tokenHandling.js';
import { requestPasswordReset, resetPassword } from '../utils/resetPassword.js';

const bcryptSalt = process.env.BCRYPT_SALT || 10;

export const register = async (req: Request, res: Response) => {
	const { email, password, name } = req.body;
	const hash = await bcrypt.hash(password, Number(bcryptSalt));
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

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
		// res.cookie('token', token, {
		// 	httpOnly: true, //TODO CHANGE
		// 	domain:'.baza2.crabdance.com',
		// 	secure: true,
		// 	sameSite: 'none'
		// });

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

export const resetPasswordRequestController = async (
	req: Request,
	res: Response
) => {
	try {
		const requestPasswordResetService = await requestPasswordReset(
			req.body.email
		);
		return res.json(requestPasswordResetService);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server Error', error });
	}
};

export const resetPasswordController = async (req: Request, res: Response) => {
	try {
		const resetPasswordService = await resetPassword(
			req.body.userId,
			req.body.token,
			req.body.password
		);
		return res
			.status(resetPasswordService.code)
			.json(resetPasswordService.message);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server Error', error });
	}
};

export const changePassword = async (
	req: IAuthenticatedRequest,
	res: Response
) => {
	try {
		const id = req.userId;
		const { oldPassword, newPassword } = req.body;
		const hash = await bcrypt.hash(newPassword, Number(bcryptSalt));
		const user = await UserModel.findById(id);
		if (user) {
			const isValid = await bcrypt.compare(oldPassword, user.passwordHash);
			if (isValid) {
				const newUser = await UserModel.findByIdAndUpdate(
					id,
					{ $set: { passwordHash: hash } },
					{ new: true }
				);

				return res.status(200).json({ message: 'Password updated', newUser });
			} else {
				return res.status(400).json({ message: 'Wrong password' });
			}
		} else {
			return res.status(404).json({ message: 'There is no such user' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server Error', error });
	}
};
