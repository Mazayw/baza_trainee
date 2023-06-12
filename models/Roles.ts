/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMemberRole:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *               description: The name of the team member role in English.
 *             pl:
 *               type: string
 *               description: The name of the team member role in Polish.
 *             ua:
 *               type: string
 *               description: The name of the team member role in Ukrainian.
 *       example:
 *         name:
 *           en: Developer
 *           pl: Programista
 *           ua: Розробник
 */

import mongoose from 'mongoose';
import { ITeamMemberRole } from '../types/index';

const TeamMemberRoleSchema = new mongoose.Schema<ITeamMemberRole>({
	name: {
		en: { type: String, required: true },
		pl: { type: String, required: true },
		ua: { type: String, required: true },
	},
});

export default mongoose.model('TeamMemberRoles', TeamMemberRoleSchema);
