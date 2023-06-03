import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { TeamMembersValidation } from '../utils/validations.js';
import * as TeamMembersController from '../controllers/TeamMembersController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Team Members
 *   description: API endpoints for managing team members
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all team members
 *     tags: [Team Members]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', TeamMembersController.getAll);

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get a team member by ID
 *     tags: [Team Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the team member
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Team member not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', TeamMembersController.getOneById);

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new team member
 *     tags: [Team Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMemberInput'
 *     responses:
 *       201:
 *         description: Team member created successfully
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
	TeamMembersValidation,
	TeamMembersController.create
);

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete a team member by ID
 *     tags: [Team Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the team member
 *     responses:
 *       200:
 *         description: Team member deleted successfully
 *       404:
 *         description: Team member not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', checkAuth, TeamMembersController.removeOneById);

/**
 * @swagger
 * /members/{id}:
 *   patch:
 *     summary: Update a team member by ID
 *     tags: [Team Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the team member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMemberInput'
 *     responses:
 *       200:
 *         description: Team member updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team member not found
 *       500:
 *         description: Internal Server Error
 */
router.patch(
	'/:id',
	checkAuth,
	TeamMembersValidation,
	TeamMembersController.updateOneById
);

export default router;
