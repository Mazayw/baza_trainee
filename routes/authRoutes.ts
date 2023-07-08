import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/UserController.js';
import checkAuth from '../utils/checkAuth.js';
import { SETTINGS } from '../settings';
import { loginValidation } from '../utils/validations/loginValidation.js';
import { registerValidation } from '../utils/validations/registerValidation.js';

/**
 * @openapi
 * tags:
 *   name: User
 *   description: Get User information
 */

/**
 * @openapi
 * /auth/user:
 *   get:
 *     summary: Get user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       403:
 *         description: Unauthorized - Invalid or missing authentication token
 *
 */
router.get('/user', checkAuth, UserController.getUserInfo);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: Bad Request - Invalid request body
 *       500:
 *         description: Server Error
 */
router.post('/login', loginValidation, UserController.login);

if (SETTINGS.allowUserRegistration) {
	/**
	 * @openapi
	 * /auth/register:
	 *   post:
	 *     summary: User registration
	 *     tags: [User]
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               email:
	 *                 type: string
	 *               password:
	 *                 type: string
	 *               name:
	 *                 type: string
	 *             example:
	 *               email: user@example.com
	 *               password: password123
	 *               name: John
	 *     responses:
	 *       201:
	 *         description: User registered successfully
	 *       400:
	 *         description: Bad Request - Invalid request body
	 *       500:
	 *         description: Server Error
	 */

	router.post('/register', registerValidation, UserController.register);
}

export default router;
