import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as ContactsController from '../controllers/ContactsController.js';
import { ContactsValidation } from '../utils/validations/contactsValidation.js';

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacts'
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
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacts'
 *     responses:
 *       200:
 *         description: Contacts data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacts'
 *       201:
 *         description: Contacts data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contacts'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: The token is incorrect OR Oops, something went wrong
 *       500:
 *         description: An error occurred while saving contacts data
 */

router.patch(
	'/',
	checkAuth,
	ContactsValidation,
	ContactsController.updateContacts
);

export default router;
