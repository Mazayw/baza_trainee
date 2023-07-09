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
 *     responses:
 *       200:
 *         description: List of partners
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', PartnersController.getAll);

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
 *         description: The partner information
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Partner not found
 */
router.get('/:id', PartnersController.getOneById);

/**
 * @swagger
 * /partners:
 *   post:
 *     summary: Create a new partner
 *     tags: [Partners]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartnerCreate'
 *     responses:
 *       201:
 *         description: The created partner
 *       400:
 *         description: Invalid request body
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post(
	'/',
	checkAuth,
	uploadWithFileSizeValidation,
	partnerCreateValidation,
	PartnersController.create
);

/**
 * @swagger
 * /partners/{id}:
 *   delete:
 *     summary: Delete a partner by ID
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
 *         description: Partner deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Partner not found
 */
router.delete('/:id', checkAuth, PartnersController.removeOneById);

/**
 * @swagger
 * /partners/{id}:
 *   patch:
 *     summary: Update a partner by ID
 *     tags: [Partners]
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartnerCreate'
 *     responses:
 *       200:
 *         description: The updated partner
 *       400:
 *         description: Invalid request body
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Partner not found
 */
router.patch(
	'/:id',
	checkAuth,
	uploadWithFileSizeValidation,
	partnerCreateValidation,
	PartnersController.updateOneById
);

export default router;
