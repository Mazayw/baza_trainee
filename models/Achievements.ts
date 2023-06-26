/**
 * @swagger
 * components:
 *   schemas:
 *     Achievements:
 *       type: object
 *       properties:
 *         projects:
 *           type: number
 *           example: 5
 *         members:
 *           type: number
 *           example: 201
 *         employed:
 *           type: number
 *           example: 99
 */

import mongoose from 'mongoose';
import { IAchievements } from '../types';

const AchievementsSchema = new mongoose.Schema<IAchievements>({
	employed: {
		type: Number,
		required: true,
	},
});

export default mongoose.model<IAchievements>(
	'Achievements',
	AchievementsSchema
);
