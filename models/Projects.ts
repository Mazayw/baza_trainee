/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - imageUrl
 *         - status
 *         - description
 *         - creationDate
 *         - launchDate
 *         - complexity
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the project.
 *         imageUrl:
 *           type: string
 *           description: The URL of the project's image.
 *         status:
 *           type: string
 *           description: The status of the project.
 *         description:
 *           type: string
 *           description: The description of the project.
 *         creationDate:
 *           type: number
 *           description: The creation date of the project in milliseconds.
 *         launchDate:
 *           type: number
 *           description: The launch date of the project in milliseconds.
 *         complexity:
 *           type: number
 *           description: The complexity level of the project.
 *         teamMembers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user assigned to the project.
 *               roleId:
 *                 type: string
 *                 description: The ID of the role assigned to the user for the project.
 *       example:
 *         title: Project A
 *         imageUrl: /example.com/image.jpg
 *         status: Active
 *         description: Lorem ipsum dolor sit amet
 *         creationDate: 1669872000000
 *         launchDate: 1669872000000
 *         complexity: 1
 *         teamMembers:
 *           - userId: 611fe538830e1465d8b5c81e
 *             roleId: 611fe538830e1465d8b5c81f
 */

import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		creationDate: {
			type: Number,
			required: true,
		},
		launchDate: {
			type: Number,
			required: true,
		},
		complexity: {
			type: Number,
			required: true,
		},
		teamMembers: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Users',
				},
				roleId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Roles',
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('Projects', ProjectSchema);
