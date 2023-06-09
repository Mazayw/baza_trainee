import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { ContactsValidation } from '../utils/validations.js';
import * as ContactsController from '../controllers/ContactsController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contacts API
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Returns the contacts
 *       404:
 *         description: Contacts data not found
 *       500:
 *         description: An error occurred while retrieving contacts data
 */

router.get('/', ContactsController.getContacts);

/**
 * @swagger
 * /contacts:
 *   patch:
 *     summary: Update contacts
 *     tags: [Contacts]
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
	ContactsValidation,
	ContactsController.updateContacts
);

export default router;
