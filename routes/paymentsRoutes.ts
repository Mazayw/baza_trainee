import { Router } from 'express';
import * as PaymentController from '../controllers/PaymentController.js';

const router = Router();

router.post('/', PaymentController.makePayment);

export default router;
