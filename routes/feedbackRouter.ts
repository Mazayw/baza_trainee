import express from 'express';
import { feedbackMailValidation } from '../utils/validations/feedbackMailValidation';
import { sendFeedback, sendMentorForm } from '../controllers/v2/feedbackController';
const router = express.Router();
import { rateLimit } from 'express-rate-limit';
import { mentorFormValidation } from '../utils/validations/mentorFormValidation';

const limit = rateLimit({ limit: 1, windowMs: 60 * 1000 * 2 });

/**
 * @openapi
 * /feedback/sendFeedback:
 *   post:
 *     summary: Send feedback to admin email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               text:
 *                 type: string
 *               to:
 *                 type: string
 *             example:
 *               name: Anton
 *               email: anton@gmail.com
 *               text: Problem with site
 *               to: youremail@gmail.com
 *     responses:
 *       200:
 *         description: Password changed
 *       404:
 *         description: Bad Request - Invalid request body
 *       500:
 *         description: Server Error
 */
router.post(
  '/sendFeedback',
  feedbackMailValidation,
  // limit,
  sendFeedback
);


/**
 * @openapi
 * /feedback/mentor:
 *   post:
 *     summary: Send mentor form to admin email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                  type: string
 *               lastName:
 *                  type: string
 *               email:
 *                  type: string
 *               phone:
 *                  type: string
 *               discord:
 *                  type: string
 *               linkedin:
 *                  type: string
 *               specialization:
 *                  type: string
 *               convenient_time:
 *                  type: string
 *               to:
 *                  type: string
 *             example:
 *                firstName: Alex
 *                lastName: Popovich
 *                email: admin@gmail.com
 *                phone: +380 123 45 675 75
 *                discord: Mentor
 *                linkedin: https://ua.linkedin.com/company/baza-trainee-ukraine
 *                specialization: Frontend
 *                convenient_time: 00-24
 *                to: admin@gmail.com
 *     responses:
 *       200:
 *         description: Mentor data sended
 *       404:
 *         description: Bad Request - Invalid request body
 *       500:
 *         description: Server Error
 */
router.post(
  '/mentor',
  mentorFormValidation,
  // limit,
  sendMentorForm
);

export default router;
