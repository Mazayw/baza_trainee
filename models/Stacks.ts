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
 *             name:
 *               type: string
 *               description: The name of the used technology.

 *       example:
 *         name: HTML
 *  
 */

import mongoose from 'mongoose';
import { IStack } from '../types/index';

const StackSchema = new mongoose.Schema<IStack>({
	name: {
		type: String,
		unique: true,
		required: true,
	},
});

export default mongoose.model('Stack', StackSchema);
