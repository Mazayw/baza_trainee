import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';

import swaggerDocs from './swagger.js';

import authRoutes from './routes/authRoutes.js';
import fileUploadRoutes from './routes/fileUploadRoutes.js';
import partnersRoutes from './routes/partnersRoutes.js';
import teamMembersRoutes from './routes/teamMembersRoutes.js';
import testimonialsRoutes from './routes/testimonialsRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';
import contactsRoutes from './routes/contactsRoutes.js';
import stacksRoutes from './routes/stacksRoutes.js';
import achievementsRoutes from './routes/achievementsRoutes.js';
import heroSliderRoutes from './routes/heroSliderRoutes.js';

config();

const {
	PORT,
	USER_NAME_DB,
	PASSWORD_DB,
	HOST_NAME_DB,
	DB_NAME,
	QUERY_PARAMS,
	DB_STRING,
} = process.env;

//const dbURL = `mongodb+srv://${USER_NAME_DB}:${PASSWORD_DB}@${HOST_NAME_DB}/${DB_NAME}${QUERY_PARAMS}`;
const dbURL = DB_STRING || '';

mongoose
	.connect(dbURL)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(`Wow! It works! Server running on port ${port}`);
});

app.use('/auth', authRoutes);
app.use('/upload', fileUploadRoutes);
app.use('/partners', partnersRoutes);
app.use('/members', teamMembersRoutes);
app.use('/testimonials', testimonialsRoutes);
app.use('/projects', projectsRoutes);
app.use('/roles', rolesRoutes);
app.use('/contacts', contactsRoutes);
app.use('/stacks', stacksRoutes);
app.use('/achievements', achievementsRoutes);
app.use('/heroslider', heroSliderRoutes);

const port: number = PORT ? parseInt(PORT) : 3001;

app.listen(port, (error?: Error) => {
	if (error) {
		return console.log('Something went wrong', error);
	}
	console.log(`Server started on port ${port}`);
});
swaggerDocs(app, port);
