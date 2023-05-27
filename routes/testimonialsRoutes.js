import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { TestimonialsValidation } from '../utils/validations.js';
import * as TestimonialsController from '../controllers/TestimonialsController.js';

const router = Router();

router.get('/', TestimonialsController.getAll);
router.get('/:id', TestimonialsController.getOneById);
router.post(
	'/',
	checkAuth,
	TestimonialsValidation,
	TestimonialsController.create
);
router.delete('/:id', checkAuth, TestimonialsController.removeOneById);
router.patch(
	'/:id',
	checkAuth,
	TestimonialsValidation,
	TestimonialsController.updateOneById
);

export default router;
