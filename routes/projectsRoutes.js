import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { projectCreateValidation } from '../utils/validations.js';
import * as ProjectsController from '../controllers/ProjectsController.js';

const router = Router();

router.get('/', ProjectsController.getAll);
router.get('/:id', ProjectsController.getOneById);
router.post('/', checkAuth, projectCreateValidation, ProjectsController.create);
router.delete('/:id', checkAuth, ProjectsController.removeOneById);
router.patch(
	'/:id',
	checkAuth,
	projectCreateValidation,
	ProjectsController.updateOneById
);

export default router;
