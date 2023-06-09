/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the testimonial author.
 *         review:
 *           type: string
 *           description: The testimonial text or review.
 *         date:
 *           type: number
 *           description: The timestamp of when the testimonial was created.
 *         imageUrl:
 *           type: string
 *           description: The URL of the testimonial image.
 *       required:
 *         - name
 *         - review
 *         - date
 *         - imageUrl
 */

import mongoose from 'mongoose';
import { ITestimonial } from '../types';

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       properties:
 *         name:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *               description: Name in English
 *             pl:
 *               type: string
 *               description: Name in Polish
 *             ua:
 *               type: string
 *               description: Name in Ukrainian
 *         review:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *               description: Review in English
 *             pl:
 *               type: string
 *               description: Review in Polish
 *             ua:
 *               type: string
 *               description: Review in Ukrainian
 *         date:
 *           type: number
 *           description: Testimonial date
 *         imageUrl:
 *           type: string
 *           description: URL of the testimonial image
 */

const TestimonialSchema = new mongoose.Schema<ITestimonial>(
	{
		name: {
			en: { type: String, required: true },
			pl: { type: String, required: true },
			ua: { type: String, required: true },
		},
		review: {
			en: { type: String, required: true },
			pl: { type: String, required: true },
			ua: { type: String, required: true },
		},
		date: { type: Number, required: true },
		imageUrl: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model('Testimonials', TestimonialSchema);
