import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/UserController.js';
import checkAuth from '../utils/checkAuth.js';
import { SETTINGS } from '../settings';
import { loginValidation } from '../utils/validations/loginValidation.js';
import { registerValidation } from '../utils/validations/registerValidation.js';
import { passwordResetRequestValidation } from '../utils/validations/passwordResetRequestValidation.js';
import { resetPasswordValidation } from '../utils/validations/resetPasswordValidation.js';
import { changePasswordValidation } from '../utils/validations/changePasswordValidation.js';

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
 * /auth/passwordRequestReset:
 *   post:
 *     summary: Request password reset
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
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: string
 *            example:
 *               https://baza-trainee.tech/passwordReset?token=0d4edd6644700fcb2a84d2b597d3413b819cae2631acbfed424a35dac4ef260e&id=650fec0015d612e0367f5ba6
 *       404:
 *         description: Bad Request - Invalid request body
 *       500:
 *         description: Server Error
 */
router.post(
	'/passwordRequestReset',
	passwordResetRequestValidation,
	UserController.resetPasswordRequestController
);

/**
 * @openapi
 * /auth/passwordReset:
 *   post:
 *     summary: Password reset
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

/**
 * @openapi
 * /auth/changePassword:
 *   patch:
 *     summary: Change password
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               oldPassword: 123456
 *               newPassword: 654321
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: Wrong old password or validation errors
 *       404:
 *         description: There is no such user
 *       500:
 *         description: Server Error
 */
router.patch(
	'/changePassword',
	checkAuth,
	changePasswordValidation,
	UserController.changePassword
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
