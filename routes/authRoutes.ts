import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/UserController.js';
import checkAuth from '../utils/checkAuth.js';
import { SETTINGS } from '../settings';
import { loginValidation } from '../utils/validations/loginValidation.js';
import { registerValidation } from '../utils/validations/registerValidation.js';
import { passwordResetRequestValidation } from '../utils/validations/passwordResetRequestValidation.js';
import { resetPasswordValidation } from '../utils/validations/resetPasswordValidation.js';

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
 *       - cookieAuth: []
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

/**
 * @openapi
 * /auth/requestReset:
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
 *             example:
 *               email: user@example.com
 *     responses:
 *       200:
 *         description: Request sent
 *       404:
 *         description: Bad Request - Invalid request body
 *       500:
 *         description: Server Error
 */
router.post(
	'/requestReset',
	passwordResetRequestValidation,
	UserController.resetPasswordRequestController
);

/**
 * @openapi
 * /auth/requestReset:
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
 *               userId:
 *                 type: string
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               userId: 650fec0015d612e0367f5ba6
 *               token: 30bcd9a93cfb9adb67eca05f106251f0567fd65556a2dc1f20f51a17a07582f1
 *               password: 1234567890
 *     responses:
 *       200:
 *         description: Password changed
 *       404:
 *         description: Bad Request - Invalid request body
 *       500:
 *         description: Server Error
 */
router.post(
	'/passwordReset',
	resetPasswordValidation,
	UserController.resetPasswordController
);

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
