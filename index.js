import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { registerValidation } from './validations/auth.js';
import { config } from 'dotenv';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';
import checkAuth from './utils/checkAuth.js';

config();

const { PORT, USER_NAME, PASSWORD_DB, SECRET_KEY } = process.env;

const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD_DB}@cluster0.2x4mz6m.mongodb.net/baza?retryWrites=true&w=majority`;

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.post('/auth/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'Wrong username or password' });
		}
		const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
		if (!isValidPass) {
			return res.status(404).json({ message: 'Wrong username or password' });
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			SECRET_KEY,
			{ expiresIn: '30d' }
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({ ...userData, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't login`, error });
	}
});

app.post('/auth/register', registerValidation, async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email,
			name,
			passwordHash: hash,
		});

		const user = await doc.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			SECRET_KEY,
			{ expiresIn: '30d' }
		);

		const { passwordHash, ...userData } = user._doc;

		res.json({ ...userData, token });
	} catch (error) {
		console.log(error);

		res.status(500).json({ message: `Can't register`, error });
	}
});

app.get('/auth/user', checkAuth, async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		const { passwordHash, ...userData } = user._doc;

		return res.json(userData);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Access denied`, error });
	}
});

const port = PORT || 3000;
app.listen(port, (error) => {
	if (error) {
		return console.log('Something went wrong', error);
	}
	console.log(`Server started on port ${port}`);
});
