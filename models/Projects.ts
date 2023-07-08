/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - imageUrl
 *         - isTeamRequired
 *         - creationDate
 *         - complexity
 *       properties:
 *         title:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *               description: The English title of the project.
 *             pl:
 *               type: string
 *               description: The Polish title of the project.
 *             ua:
 *               type: string
 *               description: The Ukrainian title of the project.
 *         imageUrl:
 *           type: string
 *           description: The URL of the project's image.
 *         deployUrl:
 *           type: string
 *           description: The URL of the deployed project.
 *         isTeamRequired:
 *           type: boolean
 *           description: Indicates if the project requires a team.
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
 *         title:
 *           en: Project A
 *           pl: Projekt A
 *           ua: Проект A
 *         imageUrl: /example.com/image.jpg
 *         deployUrl: https://example.com/deploy
 *         isTeamRequired: true
 *         creationDate: 1669872000000
 *         launchDate: 1669872000000
 *         complexity: 1
 *         teamMembers:
 *           - user:
 *               _id: 6471fa06933513f26024a990
 *               name: John Doe
 *             role:
 *               _id: 6471f9a29c17ac2190eb8791
 *               name: Developer
 */

import mongoose from 'mongoose';
import { IProject } from '../types';

const ProjectSchema = new mongoose.Schema<IProject>({
	title: {
		en: { type: String, required: true, unique: true },
		pl: { type: String, required: true, unique: true },
		ua: { type: String, required: true, unique: true },
	},
	imageUrl: {
		type: String,
		required: true,
	},
	deployUrl: {
		type: String,
	},
	isTeamRequired: {
		type: Boolean,
		required: true,
	},
	creationDate: {
		type: Number,
		required: true,
	},
	launchDate: {
		type: Number,
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
				ref: 'TeamMemberRoles',
			},
		},
	],
});

export default mongoose.model('Projects', ProjectSchema);
