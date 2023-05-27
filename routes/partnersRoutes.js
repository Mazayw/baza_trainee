import { Router } from 'express';
import checkAuth from '../utils/checkAuth.js';
import { partnerCreateValidation } from '../utils/validations.js';
import * as PartnersController from '../controllers/PartnersController.js';

const router = Router();

router.get('/', PartnersController.getAll);
router.get('/:id', PartnersController.getOneById);
router.post('/', checkAuth, partnerCreateValidation, PartnersController.create);
router.delete('/:id', checkAuth, PartnersController.removeOneById);
router.patch(
	'/:id',
	checkAuth,
	partnerCreateValidation,
	PartnersController.updateOneById
);

export default router;
