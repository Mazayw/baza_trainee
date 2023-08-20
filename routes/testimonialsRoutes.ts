import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as TestimonialsController from '../controllers/TestimonialsController.js';
import { uploadWithFileSizeValidation } from '../controllers/fileUpload/index.js';
import { TestimonialsValidation } from '../utils/validations/testimonialsValidation.js';

//import fileSizeValidator from '../utils/fileSizeValidator.js';

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TestimonialResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
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
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/TestimonialRequest'
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Maximum item count reached in the database. Please delete an existing document before creating a new one. Current limit is ХХХ items
 *       500:
 *         description: Internal Server Error
 */
router.post(
	'/',
	checkAuth,
	uploadWithFileSizeValidation('single'),
	TestimonialsValidation,
	TestimonialsController.create
);

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial by ID
 *     tags: [Testimonials]
 *     security:
 *       - cookieAuth: []
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
 *       404:
 *         description: Testimonial not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Can't remove testimonial card
 */
router.delete('/:id', checkAuth, TestimonialsController.removeOneById);

/**
 * @swagger
 * /testimonials/{id}:
 *   patch:
 *     summary: Update a testimonial by ID
 *     tags: [Testimonials]
 *     security:
 *       - cookieAuth: []
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
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/TestimonialRequest'
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialResponse'
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
	uploadWithFileSizeValidation('single'),
	TestimonialsValidation,
	TestimonialsController.updateOneById
);

export default router;
