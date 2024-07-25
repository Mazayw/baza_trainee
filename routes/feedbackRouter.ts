import express from 'express';
import { feedbackMailValidation } from '../utils/validations/feedbackMailValidation';
import { sendFeedback } from '../controllers/v2/feedbackController';
const router = express.Router();
import { rateLimit } from 'express-rate-limit';

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

export default router;
