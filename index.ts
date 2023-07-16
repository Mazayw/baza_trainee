import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import swaggerDocs from './swagger.js';

import authRoutes from './routes/authRoutes.js';
import fileUploadRoutes from './routes/fileUploadRoutes.js';
import partnersRoutes from './routes/partnersRoutes.js';
import teamMembersRoutes from './routes/teamMembersRoutes.js';
import testimonialsRoutes from './routes/testimonialsRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';
import contactsRoutes from './routes/contactsRoutes.js';
import achievementsRoutes from './routes/achievementsRoutes.js';
import heroSliderRoutes from './routes/heroSliderRoutes.js';
import docsRoutes from './routes/docsRoutes.js';
import paymentsRoutes from './routes/paymentsRoutes.js';
import translationRoutes from './routes/translationRoutes.js';
import { SETTINGS } from './settings.js';

config();

const { PORT, DB_STRING, DB_NAME } = process.env;

const dbURL = DB_STRING || '';
const dbOptions = {
	dbName: DB_NAME || 'baza',
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(dbURL, dbOptions)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

app.get('/api/v1', (req, res) => {
	res.send(`Wow! It works! Server running on port ${port}`);
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/files', fileUploadRoutes);
app.use('/api/v1/partners', partnersRoutes);
app.use('/api/v1/members', teamMembersRoutes);
app.use('/api/v1/testimonials', testimonialsRoutes);
app.use('/api/v1/projects', projectsRoutes);
app.use('/api/v1/roles', rolesRoutes);
app.use('/api/v1/contacts', contactsRoutes);
app.use('/api/v1/achievements', achievementsRoutes);
app.use('/api/v1/heroslider', heroSliderRoutes);
app.use('/api/v1/documents', docsRoutes);
app.use('/api/v1/payment', paymentsRoutes);
app.use('/api/v1/translation', translationRoutes);

const port: number = PORT ? parseInt(PORT) : 3001;

app.listen(port, (error?: Error) => {
	if (error) {
		return console.log('Something went wrong', error);
	}
	console.log(`Server started on port ${port}. V.${SETTINGS.version}`);
});
swaggerDocs(app, port);
