import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import * as DocsController from '../controllers/DocsController.js';
import { uploadWithFileSizeValidation } from '../controllers/fileUpload/index.js';
import { validateReportSize } from '../utils/validations/validateReportSize.js';

const router = Router();

router.get('/', DocsController.getDocs);

router.patch(
	'/',
	checkAuth,
	uploadWithFileSizeValidation('any'),
	validateReportSize,
	DocsController.updateDocs
);

export default router;
