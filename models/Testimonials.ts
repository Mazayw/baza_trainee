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

const TestimonialSchema = new mongoose.Schema<ITestimonial>(
	{
		name: { type: String, required: true },
		review: { type: String, required: true },
		date: { type: Number, required: true },
		imageUrl: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model('Testimonials', TestimonialSchema);
