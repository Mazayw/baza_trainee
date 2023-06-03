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

const PartnerSchema = new mongoose.Schema(
	{
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
	},
	{ timestamps: true }
);

export default mongoose.model('Partners', PartnerSchema);
