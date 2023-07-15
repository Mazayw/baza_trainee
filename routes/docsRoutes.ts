import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as DocsController from '../controllers/DocsController.js';
import { uploadWithFileSizeValidation } from '../controllers/fileUpload/index.js';
import { validateReportSize } from '../utils/validations/validateReportSize.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Documents API
 */

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Get documents
 *     tags: [Documents]
 *     description: Get documents
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/DocumentsResponse'
 *       404:
 *         description: Documents data not found
 *       500:
 *         description: An error occurred while retrieving documents data
 */
router.get('/', DocsController.getDocs);

/**
 * @swagger
 * /documents:
 *   patch:
 *     summary: Update documents
 *     tags: [Documents]
 *     description: Update documents
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/DocumentsRequest'
 *     responses:
 *       200:
 *         description: Documents data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/DocumentsResponse'
 *       201:
 *         description: Documents data created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/DocumentsResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: An error occurred while saving documents data
 */
router.patch(
	'/',
	checkAuth,
	uploadWithFileSizeValidation('any'),
	validateReportSize,
	DocsController.updateDocs
);

export default router;
