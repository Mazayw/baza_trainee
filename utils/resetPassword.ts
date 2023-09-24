import UserModel from '../models/Users.js';
import TokenModel from '../models/Token.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendEmail } from '../utils/email/sendEmail';

const clientURL = 'https://baza-trainee.tech';

const bcryptSalt = process.env.BCRYPT_SALT || 10;

export const requestPasswordReset = async (email: string) => {
	const user = await UserModel.findOne({ email });

	if (!user) throw new Error('User does not exist');
	const token = await TokenModel.findOne({ userId: user._id });
	if (token) await token.deleteOne();
	const resetToken = crypto.randomBytes(32).toString('hex');
	const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

	await new TokenModel({
		userId: user._id,
		token: hash,
		createdAt: Date.now(),
	}).save();

	const link = `${clientURL}/passwordReset?token=${resetToken}&userId=${user._id}`;
	sendEmail(
		user.email,
		'Password Reset Request',
		{ name: user.name, link: link },
		'request'
	);
	return link;
};

export const resetPassword = async (
	userId: string,
	token: string,
	password: string
) => {
	try {
		const passwordResetToken = await TokenModel.findOne({ userId });
		if (!passwordResetToken) {
			return { message: 'Invalid or expired password reset token', code: 400 };
		}
		const isValid = await bcrypt.compare(token, passwordResetToken.token);
		if (!isValid) {
			return { message: 'Invalid or expired password reset token', code: 400 };
		}
		const hash = await bcrypt.hash(password, Number(bcryptSalt));
		await UserModel.updateOne(
			{ _id: userId },
			{ $set: { passwordHash: hash } },
			{ new: true }
		);
		const user = await UserModel.findOne({ _id: userId });
		if (user) {
			sendEmail(
				user.email,
				'Password Reset Successfully',
				{
					name: user.name,
				},
				'reset'
			);
		}
		await passwordResetToken.deleteOne();
		return { message: 'Password changed', code: 200 };
	} catch (error) {
		return { message: error, code: 500 };
	}
};
