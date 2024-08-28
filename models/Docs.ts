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
 *             rules:
 *               type: string
 *               example: rules.pdf
 *             privacyPolicy:
 *               type: object
 *               properties:
 *                 ua:
 *                   type: string
 *                   example: privacy_ua.pdf
 *             termsOfUse:
 *               type: object
 *               properties:
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
 *         rules:
 *           type: file
 *           format: binary
 *         privacyPolicy[ua]:
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
			ua: { type: String, required: true },
		},
		termsOfUse: {
			ua: { type: String, required: true },
		},
		rules: { type: String, required: true }
	},
});

export default mongoose.model('Docs', DocsSchema);
