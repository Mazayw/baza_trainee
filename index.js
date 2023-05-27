import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation } from './utils/validations.js';
import { config } from 'dotenv';
import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PartnersController from './controllers/PartnersController.js';

config();

const { PORT, USER_NAME, PASSWORD_DB, SECRET_KEY } = process.env;

const dbURL = `mongodb+srv://${USER_NAME}:${PASSWORD_DB}@cluster0.2x4mz6m.mongodb.net/baza?retryWrites=true&w=majority`;

mongoose
	.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`Server running on port ${port}`);
});

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/user', checkAuth, UserController.getUserInfo);

const port = PORT || 3000;
app.listen(port, (error) => {
	if (error) {
		return console.log('Something went wrong', error);
	}
	console.log(`Server started on port ${port}`);
});
