import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as HeroSliderController from '../controllers/HeroSliderController.js';
import { uploadWithFileSizeValidation } from '../controllers/fileUpload/index.js';
import { HeroSliderValidation } from '../utils/validations/heroSliderValidation.js';

//import fileSizeValidator from '../utils/fileSizeValidator.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: HeroSlider
 *   description: API endpoints for managing hero slider
 */

/**
 * @swagger
 * /heroslider:
 *   get:
 *     summary: Get all hero sliders
 *     tags: [HeroSlider]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/HeroSlider'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', HeroSliderController.getAll);

/**
 * @swagger
 * /heroslider/{id}:
 *   get:
 *     summary: Get a hero slider by ID
 *     tags: [HeroSlider]
 *     responseBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HeroSlider'
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the hero slider
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HeroSlider'
 *       404:
 *         description: hero slider not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', HeroSliderController.getOneById);

/**
 * @swagger
 * /heroslider:
 *   post:
 *     summary: Create a new hero slider
 *     tags: [HeroSlider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/HeroSlider'
 *     responses:
 *       201:
 *         description: hero slider created successfully
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HeroSlider'
 *       400:
 *         description: No file or image URL found in the request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hero slider item not found
 *       409:
 *         description: Maximum item count reached in the database. Please delete an existing document before creating a new one. Current limit is X items
 *       500:
 *         description: Can't update hero slider item
 */
router.post(
	'/',
	checkAuth,
	uploadWithFileSizeValidation('single'),
	HeroSliderValidation,
	HeroSliderController.create
);

/**
 * @swagger
 * /heroslider/{id}:
 *   delete:
 *     summary: Delete a hero slider by ID
 *     tags: [HeroSlider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hero slider
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HeroSlider'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hero slider item not found
 *       500:
 *         description: Can't remove hero slider item
 */
router.delete('/:id', checkAuth, HeroSliderController.removeOneById);

/**
 * @swagger
 * /heroslider/{id}:
 *   patch:
 *     summary: Update a hero slider by ID
 *     tags: [HeroSlider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hero slider
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/HeroSlider'
 *           encoding:
 *             file:
 *               contentType: image/jpeg
 *     responses:
 *       200:
 *         description: Hero slider updated successfully
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/HeroSlider'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hero slider item not found
 *       500:
 *         description: Can't update hero slider item
 */
router.patch(
	'/:id',
	checkAuth,
	uploadWithFileSizeValidation('single'),
	HeroSliderValidation,
	HeroSliderController.updateOneById
);

export default router;
