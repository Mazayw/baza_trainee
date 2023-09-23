/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         passwordHash:
 *           type: string
 *           description: The hashed password of the user.
 *       required:
 *         - name
 *         - email
 *         - passwordHash
 */

import mongoose from 'mongoose';
import { IUser } from '../types';
import bcrypt from 'bcrypt';

const bcryptSalt = process.env.BCRYPT_SALT || 10;

const UserSchema = new mongoose.Schema<IUser>({
	name: { type: String, required: true },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('passwordHash')) {
		return next();
	}
	const hash = await bcrypt.hash(this.passwordHash, Number(bcryptSalt));
	this.passwordHash = hash;
	next();
});

export default mongoose.model('Users', UserSchema);
