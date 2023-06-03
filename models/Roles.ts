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
 *           type: string
 *           description: The name of the team member role.
 *       example:
 *         name: Developer
 */

import mongoose from 'mongoose';

const TeamMemberRoleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

export default mongoose.model('TeamMemberRoles', TeamMemberRoleSchema);
