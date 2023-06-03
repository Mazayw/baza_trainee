import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { TestimonialsValidation } from '../utils/validations.js';
import * as TestimonialsController from '../controllers/TestimonialsController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Testimonials
 *   description: API endpoints for managing testimonials
 */

/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', TestimonialsController.getAll);

/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     summary: Get a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the testimonial
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Testimonial not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', TestimonialsController.getOneById);

/**
 * @swagger
 * /testimonials:
 *   post:
 *     summary: Create a new testimonial
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonialInput'
 *     responses:
 *       201:
 *         description: Testimonial created successfully
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
	TestimonialsValidation,
	TestimonialsController.create
);

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the testimonial
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
router.delete('/:id', checkAuth, TestimonialsController.removeOneById);

/**
 * @swagger
 * /testimonials/{id}:
 *   patch:
 *     summary: Update a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the testimonial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonialInput'
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Testimonial not found
 *       500:
 *         description: Internal Server Error
 */
router.patch(
	'/:id',
	checkAuth,
	TestimonialsValidation,
	TestimonialsController.updateOneById
);

export default router;
