/**
 * @swagger
 * components:
 *   schemas:
 *     Partner:
 *       type: object
 *       required:
 *         - name
 *         - imageUrl
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the partner.
 *         homeUrl:
 *           type: string
 *           description: The URL of the partner's homepage.
 *         imageUrl:
 *           type: string
 *           description: The URL of the partner's image.
 *       example:
 *         name: Partner A
 *         homeUrl: https://example.com
 *         imageUrl: /example.com/image.jpg
 */

import mongoose from 'mongoose';
import { IPartner } from '../types';

const PartnerSchema = new mongoose.Schema<IPartner>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	homeUrl: {
		type: String,
	},
	imageUrl: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Partners', PartnerSchema);
