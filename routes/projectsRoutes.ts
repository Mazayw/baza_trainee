import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as ProjectsController from '../controllers/ProjectsController.js';
import { SETTINGS } from '../settings.js';
import { uploadWithFileSizeValidation } from '../controllers/fileUpload/index.js';
import { projectCreateValidation } from '../utils/validations/projectCreateValidation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', ProjectsController.getAll);

/**
 * @swagger
 * /projects/search:
 *   get:
 *     summary: Search projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
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
 *         description: Number of results per page, default 9
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/search', ProjectsController.search);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', ProjectsController.getOneById);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       201:
 *         description: Project created successfully
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
	uploadWithFileSizeValidation(SETTINGS.fileSizeLimits.projectCard),
	projectCreateValidation,
	ProjectsController.create
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', checkAuth, ProjectsController.removeOneById);

/**
 * @swagger
 * /projects/{id}:
 *   patch:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */
router.patch(
	'/:id',
	checkAuth,
	uploadWithFileSizeValidation(SETTINGS.fileSizeLimits.projectCard),
	projectCreateValidation,
	ProjectsController.updateOneById
);

export default router;
