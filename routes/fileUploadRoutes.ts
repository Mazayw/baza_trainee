import { Router } from 'express';
import { getFile } from '../controllers/fileUpload/disk-storage.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Files
 *   description: API endpoints for managing files
 */

/**
 * @swagger
 * /files/{filename}:
 *   get:
 *     summary: Get file
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The filename of the requested file
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: File not found
 */
router.get('/:filename', getFile);

export default router;
