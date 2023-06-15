import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { AchievementsValidation } from '../utils/validations.js';
import * as AchievementsController from '../controllers/AchievementsController.js';

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
 *         description: Returns the achievements
 *       404:
 *         description: achievements data not found
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
 *     summary: Update contacts
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacts'
 *     responses:
 *       200:
 *         description: Contacts data updated successfully
 *       201:
 *         description: Contacts data created successfully
 *       403:
 *         description: The token is incorrect OR Oops, something went wrong
 *       500:
 *         description: An error occurred while saving contacts data
 */
router.patch(
	'/',
	checkAuth,
	AchievementsValidation,
	AchievementsController.updateAchievements
);

export default router;
