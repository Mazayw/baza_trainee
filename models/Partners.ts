/**
 * @swagger
 * components:
 *   schemas:
 *     PartnerResponse:
 *       type: object
 *       required:
 *         - imageUrl
 *       properties:
 *         homeUrl:
 *           type: string
 *           description: The URL of the partner's homepage.
 *         name:
 *           type: string
 *           description: Partner's name.
 *         imageUrl:
 *           type: string
 *           description: The URL of the partner's image.
 *       example:
 *         name: example
 *         homeUrl: https://example.com
 *         imageUrl: image.jpg
 *     PartnerRequest:
 *       type: object
 *       required:
 *         - imageUrl
 *       properties:
 *         homeUrl:
 *           type: string
 *           description: The URL of the partner's homepage.
 *         name:
 *           type: string
 *           description: Partner's name.
 *         file:
 *           type: file
 *           format: binary
 *           description: Testimonial image file (JPG, PNG, WEBP)
 */

import mongoose from 'mongoose';
import { IPartner } from '../types';

const PartnerSchema = new mongoose.Schema<IPartner>({
	homeUrl: {
		type: String,
	},
	name: {
		type: String,
		unique: true,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Partners', PartnerSchema);
