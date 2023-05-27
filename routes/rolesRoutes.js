import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { roleCreateValidation } from '../utils/validations.js';
import * as RolesController from '../controllers/RolesController.js';

const router = Router();

router.get('/', RolesController.getAll);
router.get('/:id', RolesController.getOneById);
router.post('/', checkAuth, roleCreateValidation, RolesController.create);
router.delete('/:id', checkAuth, RolesController.removeOneById);
router.patch(
	'/:id',
	checkAuth,
	roleCreateValidation,
	RolesController.updateOneById
);

export default router;
