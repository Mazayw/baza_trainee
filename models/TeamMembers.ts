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
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *             pl:
 *               type: string
 *             ua:
 *               type: string
 *           description: The name of the team member.
 *         profileUrl:
 *           type: string
 *           unique: true
 *           description: The profile URL of the team member.
 *       example:
 *         name:
 *           en: John Doe
 *           pl: Jan Kowalski
 *           ua: Іван Петрович
 *         profileUrl: https://www.linkedin.com/in/johndoe
 */

import mongoose from 'mongoose';
import { ITeamMember } from '../types';

const TeamMemberSchema = new mongoose.Schema<ITeamMember>({
	name: {
		en: { type: String, required: true },
		pl: { type: String, required: true },
		ua: { type: String, required: true },
	},
	profileUrl: {
		type: String,
		unique: true,
	},
});

export default mongoose.model<ITeamMember>('TeamMembers', TeamMemberSchema);
