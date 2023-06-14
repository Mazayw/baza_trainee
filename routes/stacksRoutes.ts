import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { stackCreateValidation } from '../utils/validations.js';
import * as StacksController from '../controllers/StacksController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Stacks
 *   description: API endpoints for managing stacks
 */

/**
 * @swagger
 * /stacks:
 *   get:
 *     summary: Get all stacks
 *     tags: [Stacks]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', StacksController.getAll);

/**
 * @swagger
 * /stacks/{id}:
 *   get:
 *     summary: Get a stack by ID
 *     tags: [Stacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the stack
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Stack not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', StacksController.getOneById);

/**
 * @swagger
 * /stacks:
 *   post:
 *     summary: Create a new stack
 *     tags: [Stacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StackInput'
 *     responses:
 *       201:
 *         description: Stack created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/', checkAuth, stackCreateValidation, StacksController.create);

/**
 * @swagger
 * /stacks/{id}:
 *   delete:
 *     summary: Delete a stack by ID
 *     tags: [Stacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the stack
 *     responses:
 *       200:
 *         description: Stack deleted successfully
 *       404:
 *         description: Stack not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', checkAuth, StacksController.removeOneById);

/**
 * @swagger
 * /stacks/{id}:
 *   patch:
 *     summary: Update a stack by ID
 *     tags: [Stacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the stack
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StackInput'
 *     responses:
 *       200:
 *         description: Stack updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Stack not found
 *       500:
 *         description: Internal Server Error
 */
router.patch(
	'/:id',
	checkAuth,
	stackCreateValidation,
	StacksController.updateOneById
);

export default router;
