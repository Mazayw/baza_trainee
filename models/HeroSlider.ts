/**
 * @swagger
 * components:
 *   schemas:
 *     HeroSlider:
 *       type: object
 *       properties:
 *         title:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *               description: Title in English
 *             pl:
 *               type: string
 *               description: Title in Polish
 *             ua:
 *               type: string
 *               description: Title in Ukrainian
 *         subtitle:
 *           type: object
 *           properties:
 *             en:
 *               type: string
 *               description: Subtitle in English
 *             pl:
 *               type: string
 *               description: Subtitle in Polish
 *             ua:
 *               type: string
 *               description: Subtitle in Ukrainian
 *         imageUrl:
 *           type: string
 *           description: URL of the hero slider image
 *       required:
 *         - title
 *         - subtitle
 *         - imageUrl
 */

import mongoose from 'mongoose';
import { IHeroSlider } from '../types';

const HeroSliderSchema = new mongoose.Schema<IHeroSlider>({
	title: {
		en: { type: String, required: true },
		pl: { type: String, required: true },
		ua: { type: String, required: true },
	},
	subtitle: {
		en: { type: String, required: true },
		pl: { type: String, required: true },
		ua: { type: String, required: true },
	},
	imageUrl: { type: String, required: true },
});

export default mongoose.model('HeroSlider', HeroSliderSchema);
