/**
 * @swagger
 * components:
 *   schemas:
 *     Docs:
 *       type: object
 *       properties:
 *         docs:
 *           type: object
 *           properties:
 *             report:
 *               type: string
 *               example: report.pdf
 *             statute:
 *               type: string
 *               example: statute.pdf
 *             privacyPolicy:
 *               type: object
 *               properties:
 *                 en:
 *                   type: string
 *                   example: privacy_en.pdf
 *                 pl:
 *                   type: string
 *                   example: privacy_pl.pdf
 *                 ua:
 *                   type: string
 *                   example: privacy_ua.pdf
 *             termsOfUse:
 *               type: object
 *               properties:
 *                 en:
 *                   type: string
 *                   example: terms_en.pdf
 *                 pl:
 *                   type: string
 *                   example: terms_pl.pdf
 *                 ua:
 *                   type: string
 *                   example: terms_ua.pdf
 */

import mongoose from 'mongoose';
import { IDocs } from '../types';

const DocsSchema = new mongoose.Schema<IDocs>({
	docs: {
		report: { type: String, required: true },
		statute: { type: String, required: true },
		privacyPolicy: {
			en: { type: String, required: true },
			pl: { type: String, required: true },
			ua: { type: String, required: true },
		},
		termsOfUse: {
			en: { type: String, required: true },
			pl: { type: String, required: true },
			ua: { type: String, required: true },
		},
	},
});

export default mongoose.model('Docs', DocsSchema);
