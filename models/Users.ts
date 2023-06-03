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

const UserSchema = new mongoose.Schema<IUser>(
	{
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
	},
	{ timestamps: true }
);

export default mongoose.model('Users', UserSchema);
