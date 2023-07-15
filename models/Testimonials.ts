import mongoose from 'mongoose';
import { ITestimonial } from '../types';

/**
 * @swagger
 * components:
 *   schemas:
 *     TestimonialResponse:
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
 *         role:
 *           type: string
 *           description: Author's specialization
 *         imageUrl:
 *           type: string
 *           description: URL of the testimonial image
 *     TestimonialRequest:
 *       type: object
 *       properties:
 *         name[en]:
 *           type: string
 *           description: Name in English
 *         name[pl]:
 *           type: string
 *           description: Name in Polish
 *         name[ua]:
 *           type: string
 *           description: Name in Ukrainian
 *         review[en]:
 *           type: string
 *           description: Review in English
 *         review[pl]:
 *           type: string
 *           description: Review in Polish
 *         review[ua]:
 *           type: string
 *           description: Review in Ukrainian
 *         role:
 *           type: string
 *           description: Author's specialization
 *         file:
 *           type: file
 *           format: binary
 *           description: Testimonial image file (JPG, PNG, WEBP)
 */

const TestimonialSchema = new mongoose.Schema<ITestimonial>({
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
	role: { type: String, required: true },
	imageUrl: { type: String, required: true },
});

export default mongoose.model('Testimonials', TestimonialSchema);
