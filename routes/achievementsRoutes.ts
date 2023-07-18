import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as AchievementsController from '../controllers/AchievementsController.js';
import { AchievementsValidation } from '../utils/validations/achievementsValidation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Achievements
 *   description: Achievements API
 */

/**
 * @swagger
 * /achievements:
 *   get:
 *     summary: Get achievements
 *     tags: [Achievements]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Achievements'
 *       500:
 *         description: An error occurred while retrieving achievements data
 */

router.get('/', AchievementsController.getAchievements);

/**
 * @swagger
 * /achievements/employed:
 *   get:
 *     summary: Get employed data
 *     tags: [Achievements]
 *     responses:
 *       200:
 *         description: Returns the employed data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employed:
 *                   type: number
 *                   example: 5
 *       404:
 *         description: Employed data not found
 *       500:
 *         description: An error occurred while retrieving employed data
 */

router.get('/employed', AchievementsController.getEmployed);

/**
 * @swagger
 * /achievements:
 *   patch:
 *     summary: Update employed data
 *     tags: [Achievements]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employed:
 *                   type: number
 *                   example: 5
 *     responses:
 *       200:
 *         description: Achievements data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employed:
 *                   type: number
 *                   example: 5
 *       201:
 *         description: Achievements data created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employed:
 *                   type: number
 *                   example: 5
 *       403:
 *         description: The token is incorrect OR Oops, something went wrong
 *       500:
 *         description: An error occurred while saving achievements data
 */
router.patch(
	'/',
	checkAuth,
	AchievementsValidation,
	AchievementsController.updateAchievements
);

export default router;
