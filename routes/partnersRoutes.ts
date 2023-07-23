import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as PartnersController from '../controllers/PartnersController.js';
import { uploadWithFileSizeValidation } from '../controllers/fileUpload/index.js';
import { partnerCreateValidation } from '../utils/validations/partnerCreateValidation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Partners
 *   description: Partner management
 */

/**
 * @swagger
 * /partners:
 *   get:
 *     summary: Get all partners
 *     tags: [Partners]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number, default 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of results per page, default 23
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PartnerResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', PartnersController.search);

/**
 * @swagger
 * /partners/{id}:
 *   get:
 *     summary: Get a partner by ID
 *     tags: [Partners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the partner
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PartnerResponse'
 *       404:
 *         description: Partner not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', PartnersController.getOneById);

/**
 * @swagger
 * /partners:
 *   post:
 *     summary: Create a new partner
 *     tags: [Partners]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/PartnerRequest'
 *     responses:
 *       201:
 *         description: Partner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PartnerResponse'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
	'/',
	checkAuth,
	uploadWithFileSizeValidation('single'),
	partnerCreateValidation,
	PartnersController.create
);

/**
 * @swagger
 * /partners/{id}:
 *   delete:
 *     summary: Delete a partner by ID
 *     tags: [Partners]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the partner
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Partner deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PartnerResponse'
 *       404:
 *         description: Partner not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Can't remove partner card
 */
router.delete('/:id', checkAuth, PartnersController.removeOneById);

/**
 * @swagger
 * /partners/{id}:
 *   patch:
 *     summary: Update a partner by ID
 *     tags: [Partners]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the partner
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/PartnerRequest'
 *     responses:
 *       200:
 *         description: Partner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PartnerResponse'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Partner not found
 *       500:
 *         description: Internal Server Error
 */
router.patch(
	'/:id',
	checkAuth,
	uploadWithFileSizeValidation('single'),
	partnerCreateValidation,
	PartnersController.updateOneById
);

export default router;
