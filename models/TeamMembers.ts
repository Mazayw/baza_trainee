/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMember:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the team member.
 *         profileUrl:
 *           type: string
 *           unique: true
 *           description: The profile URL of the team member.
 *       example:
 *         name: John Doe
 *         profileUrl: /team/johndoe
 */

import mongoose from 'mongoose';
import { ITeamMember } from '../types';

const TeamMemberSchema = new mongoose.Schema<ITeamMember>(
	{
		name: {
			type: String,
			required: true,
		},
		profileUrl: {
			type: String,
			unique: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('TeamMembers', TeamMemberSchema);
