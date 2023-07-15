/**
 * @swagger
 * components:
 *   schemas:
 *     DocumentsResponse:
 *       type: object
 *       properties:
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
 *     DocumentsRequest:
 *       type: object
 *       properties:
 *         report:
 *           type: file
 *           format: binary
 *         statute:
 *           type: file
 *           format: binary
 *         privacyPolicy[en]:
 *               type: file
 *               format: binary
 *         privacyPolicy[pl]:
 *               type: file
 *               format: binary
 *         privacyPolicy[ua]:
 *               type: file
 *               format: binary
 *         termsOfUse[en]:
 *               type: file
 *               format: binary
 *         termsOfUse[pl]:
 *               type: file
 *               format: binary
 *         termsOfUse[ua]:
 *               type: file
 *               format: binary
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
