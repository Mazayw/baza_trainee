/**
 * @swagger
 * components:
 *   parameters:
 *     FileUpload:
 *       name: image
 *       in: formData
 *       description: The image file to upload.
 *       required: true
 *       type: file
 *   responses:
 *     FileUploadSuccess:
 *       description: The URL of the uploaded file.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the uploaded file.
 *             example:
 *               url: /uploads/image.jpg
 */

import { Router } from 'express';
import multer from 'multer';
import checkAuth from '../utils/checkAuth.js';

const router = Router();
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     tags: [File Upload]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 $ref: '#/components/parameters/FileUpload'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/FileUploadSuccess'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', checkAuth, upload.single('image'), (req, res) => {
	res.json({ url: `/uploads/${req.file.originalname}` });
});

export default router;
