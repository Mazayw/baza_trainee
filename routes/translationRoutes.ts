import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as TranslateController from '../controllers/translation/TranslateController.js';

//import fileSizeValidator from '../utils/fileSizeValidator.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Translation
 *   description: API endpoints for managing translations
 */

/**
 * @openapi
 * /translation/{lang}:
 *   post:
 *     summary: Translate text to a specific language
 *     tags: [Translation]
 *     parameters:
 *       - in: path
 *         name: lang
 *         required: true
 *         description: 'Target language code. Example: en, pl, es'
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: string
 *                 description: Text to be translated
 *     responses:
 *       '200':
 *         description: Successful translation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 input:
 *                   type: string
 *                   description: Input text
 *                 translated:
 *                   type: string
 *                   description: Translated text
 *       '406':
 *         description: Invalid language or no text provided
 *       '500':
 *         description: Error occurred during translation
 */

router.post('/:lang', checkAuth, TranslateController.getTranslation);

export default router;
