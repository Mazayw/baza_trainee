import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { TeamMembersValidation } from '../utils/validations.js';
import * as TeamMembersController from '../controllers/TeamMembersController.js';

const router = Router();

router.get('/', TeamMembersController.getAll);
router.get('/:id', TeamMembersController.getOneById);
router.post(
	'/',
	checkAuth,
	TeamMembersValidation,
	TeamMembersController.create
);
router.delete('/:id', checkAuth, TeamMembersController.removeOneById);
router.patch(
	'/:id',
	checkAuth,
	TeamMembersValidation,
	TeamMembersController.updateOneById
);

export default router;
