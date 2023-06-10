/**
 * @swagger
 * components:
 *   schemas:
 *     Contacts:
 *       type: object
 *       properties:
 *         contacts:
 *           type: object
 *           properties:
 *             contactsDataList:
 *               type: object
 *               properties:
 *                 phone1:
 *                   type: number
 *                   example: 1234567890
 *                 phone2:
 *                   type: number
 *                   example: 9876543210
 *                 email:
 *                   type: string
 *                   example: example@example.com
 *             socialsMediaList:
 *               type: object
 *               properties:
 *                 linkedin:
 *                   type: string
 *                   example: https://www.linkedin.com/in/example
 *                 facebook:
 *                   type: string
 *                   example: https://www.facebook.com/example
 */

import mongoose from 'mongoose';
import { IContacts } from '../types';

const ContactsSchema = new mongoose.Schema<IContacts>({
	contacts: {
		contactsDataList: {
			phone1: {
				type: Number,
				required: true,
			},
			phone2: {
				type: Number,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
		},
		socialsMediaList: {
			linkedin: {
				type: String,
				required: true,
			},
			facebook: {
				type: String,
				required: true,
			},
		},
	},
});

export default mongoose.model('Contacts', ContactsSchema);
