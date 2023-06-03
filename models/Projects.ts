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
 *               user:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the user assigned to the project.
 *                   name:
 *                     type: string
 *                     description: The name of the user assigned to the project.
 *               role:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the role assigned to the user for the project.
 *                   name:
 *                     type: string
 *                     description: The name of the role assigned to the user for the project.
 *       example:
 *         title: Project A
 *         imageUrl: /example.com/image.jpg
 *         status: Active
 *         description: Lorem ipsum dolor sit amet
 *         creationDate: 1669872000000
 *         launchDate: 1669872000000
 *         complexity: 1
 *         teamMembers:
 *           - user:
 *               _id: 6471fa06933513f26024a990
 *               name: QA
 *             role:
 *               _id: 6471f9a29c17ac2190eb8791
 *               name: PM
 */

import mongoose from 'mongoose';
import { IProject } from '../types';

const ProjectSchema = new mongoose.Schema<IProject>(
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
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Users',
				},
				role: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Roles',
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('Projects', ProjectSchema);
