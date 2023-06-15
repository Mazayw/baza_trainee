import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { HeroSliderValidation } from '../utils/validations.js';
import * as HeroSliderController from '../controllers/HeroSliderController.js';
import { SETTINGS } from '../settings';
import { uploadWithFileSizeValidation } from '../controllers/fileUpload/s3-storage.js';
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
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hero slider
 *     responses:
 *       200:
 *         description: Success
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/heroslider'
 *     responses:
 *       201:
 *         description: hero slider created successfully
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
	uploadWithFileSizeValidation(SETTINGS.fileSizeLimits.heroSliderPhoto),
	HeroSliderValidation,
	HeroSliderController.create
);

/**
 * @swagger
 * /heroslider/{id}:
 *   delete:
 *     summary: Delete a hero slider by ID
 *     tags: [HeroSlider]
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
 *       404:
 *         description: Testimonial not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', checkAuth, HeroSliderController.removeOneById);

/**
 * @swagger
 * /heroslider/{id}:
 *   patch:
 *     summary: Update a hero slider by ID
 *     tags: [HeroSlider]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hero slider
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/heroslider'
 *     responses:
 *       200:
 *         description: Hero slider updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hero slider not found
 *       500:
 *         description: Internal Server Error
 */
router.patch(
	'/:id',
	checkAuth,
	uploadWithFileSizeValidation(SETTINGS.fileSizeLimits.heroSliderPhoto),
	HeroSliderValidation,
	HeroSliderController.updateOneById
);

export default router;
