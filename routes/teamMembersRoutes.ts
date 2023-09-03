import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as TeamMembersController from '../controllers/TeamMembersController.js';
import { TeamMembersValidation } from '../utils/validations/teamMembersValidation.js';

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
 *     parameters:
 *       - in: query
 *         name: search
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
 *         description: Number of results per page, default 10
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TeamMember'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *                     totalResults:
 *                       type: number
 *       500:
 *         description: Can't get members
 */
router.get('/', TeamMembersController.search);

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMember'
 *       404:
 *         description: Member not found

 */
router.get('/:id', TeamMembersController.getOneById);

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new team member
 *     tags: [Team Members]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamMember'
 *     responses:
 *       201:
 *         description: Team member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMember'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Can't create member
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
 *     security:
 *       - cookieAuth: []
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMember'
 *       404:
 *         description: Member not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Can't remove member card
 */
router.delete('/:id', checkAuth, TeamMembersController.removeOneById);

/**
 * @swagger
 * /members/{id}:
 *   patch:
 *     summary: Update a team member by ID
 *     tags: [Team Members]
 *     security:
 *       - cookieAuth: []
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
 *             $ref: '#/components/schemas/TeamMember'
 *     responses:
 *       200:
 *         description: Team member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMember'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Member not found
 *       500:
 *         description: Can't update member
 */
router.patch(
	'/:id',
	checkAuth,
	TeamMembersValidation,
	TeamMembersController.updateOneById
);

export default router;
