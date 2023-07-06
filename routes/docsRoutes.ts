import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import {
	ContactsValidation,
	validateReportSize,
} from '../utils/validations.js';
import * as DocsController from '../controllers/DocsController.js';
import { uploadWithFileSizeValidation } from '../controllers/fileUpload/index.js';
import { SETTINGS } from '../settings.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Documents API
 *   description: Documents API
 */

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Get contacts
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: Returns the contacts
 *       404:
 *         description: Contacts data not found
 *       500:
 *         description: An error occurred while retrieving contacts data
 */

router.get('/', DocsController.getDocs);

/**
 * @swagger
 * /contacts:
 *   patch:
 *     summary: Update contacts
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacts'
 *     responses:
 *       200:
 *         description: Contacts data updated successfully
 *       201:
 *         description: Contacts data created successfully
 *       403:
 *         description: The token is incorrect OR Oops, something went wrong
 *       500:
 *         description: An error occurred while saving contacts data
 * components:
 *   schemas:
 *     Contacts:
 *       type: object
 *       properties:
 *         contacts:
 *           type: object
 *           properties:
 *             contactsDataList:
 *               type: object
 *               properties:
 *                 phone1:
 *                   type: number
 *                   description: Phone 1 number
 *                 phone2:
 *                   type: number
 *                   description: Phone 2 number
 *                 email:
 *                   type: string
 *                   description: Email address
 *             socialsMediaList:
 *               type: object
 *               properties:
 *                 linkedin:
 *                   type: string
 *                   description: LinkedIn URL
 *                 facebook:
 *                   type: string
 *                   description: Facebook URL
 */

router.patch(
	'/',
	checkAuth,
	uploadWithFileSizeValidation(SETTINGS.fileSizeLimits.report, 'any'),
	validateReportSize,
	DocsController.updateDocs
);

export default router;
