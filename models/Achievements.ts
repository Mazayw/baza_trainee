/**
 * @swagger
 * components:
 *   schemas:
 *     Achievements:
 *       type: object
 *       properties:
 *         employed:
 *           type: number
 *           example: 5
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
