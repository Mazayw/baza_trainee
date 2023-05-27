import express from 'express';
const router = express.Router();

import * as UserController from '../controllers/UserController.js';
import checkAuth from '../utils/checkAuth.js';
import { loginValidation, registerValidation } from '../utils/validations.js';

// Define the routes
router.get('/user', checkAuth, UserController.getUserInfo);
router.post('/login', loginValidation, UserController.login);
router.post('/register', registerValidation, UserController.register);

export default router;
