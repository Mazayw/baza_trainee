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
import { IToken } from '../types';

const TokenSchema = new mongoose.Schema<IToken>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user',
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 3600,
	},
});

export default mongoose.model('Token', TokenSchema);
