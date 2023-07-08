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
import achievementsRoutes from './routes/achievementsRoutes.js';
import heroSliderRoutes from './routes/heroSliderRoutes.js';
import docsRoutes from './routes/docsRoutes.js';
import paymentsRoutes from './routes/paymentsRoutes.js';
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
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
	res.send(`Wow! It works! Server running on port ${port}`);
});

app.use('/auth', authRoutes);
app.use('/files', fileUploadRoutes);
app.use('/partners', partnersRoutes);
app.use('/members', teamMembersRoutes);
app.use('/testimonials', testimonialsRoutes);
app.use('/projects', projectsRoutes);
app.use('/roles', rolesRoutes);
app.use('/contacts', contactsRoutes);
app.use('/achievements', achievementsRoutes);
app.use('/heroslider', heroSliderRoutes);
app.use('/documents', docsRoutes);
app.use('/payment', paymentsRoutes);

const port: number = PORT ? parseInt(PORT) : 3001;

app.listen(port, (error?: Error) => {
	if (error) {
		return console.log('Something went wrong', error);
	}
	console.log(`Server started on port ${port}. V.${SETTINGS.version}`);
});
swaggerDocs(app, port);
