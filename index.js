import express from 'express';
import mongoose from 'mongoose';
import {
	registerValidation,
	loginValidation,
	partnerCreateValidation,
	roleCreateValidation,
	TeamMembersValidation,
	TestimonialsValidation,
	projectCreateValidation,
} from './utils/validations.js';
import { config } from 'dotenv';
import checkAuth from './utils/checkAuth.js';

import {
	UserController,
	PartnersController,
	ProjectsController,
	RolesController,
	TeamMembersController,
	TestimonialsController,
} from './controllers/index.js';

import multer from 'multer';

config();

const { PORT, USER_NAME, PASSWORD_DB } = process.env;

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
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
	res.send(`Server running on port ${port}`);
});

// Users
app.get('/auth/user', checkAuth, UserController.getUserInfo);
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);

// File upload
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({ url: `/uploads/${req.file.originalname}` });
});

//Partners
app.get('/partners', PartnersController.getAll);
app.get('/partners/:id', PartnersController.getOneById);
app.post(
	'/partners',
	checkAuth,
	partnerCreateValidation,
	PartnersController.create
);
app.delete('/partners/:id', checkAuth, PartnersController.removeOneById);
app.patch(
	'/partners/:id',
	checkAuth,
	partnerCreateValidation,
	PartnersController.updateOneById
);

//Members
app.get('/members', TeamMembersController.getAll);
app.get('/members/:id', TeamMembersController.getOneById);
app.post(
	'/members',
	checkAuth,
	TeamMembersValidation,
	TeamMembersController.create
);
app.delete('/members/:id', checkAuth, TeamMembersController.removeOneById);
app.patch(
	'/members/:id',
	checkAuth,
	TeamMembersValidation,
	TeamMembersController.updateOneById
);

//Testimonials
app.get('/testimonials', TestimonialsController.getAll);
app.get('/testimonials/:id', TestimonialsController.getOneById);
app.post(
	'/testimonials',
	checkAuth,
	TestimonialsValidation,
	TestimonialsController.create
);
app.delete(
	'/testimonials/:id',
	checkAuth,
	TestimonialsController.removeOneById
);
app.patch(
	'/testimonials/:id',
	checkAuth,
	TestimonialsValidation,
	TestimonialsController.updateOneById
);

//Projects
app.get('/projects', ProjectsController.getAll);
app.get('/projects/:id', ProjectsController.getOneById);
app.post(
	'/projects',
	checkAuth,
	projectCreateValidation,
	ProjectsController.create
);
app.delete('/projects/:id', checkAuth, TestimonialsController.removeOneById);
app.patch(
	'/projects/:id',
	checkAuth,
	projectCreateValidation,
	ProjectsController.updateOneById
);

//Roles
app.get('/roles', RolesController.getAll);
app.get('/roles/:id', RolesController.getOneById);
app.post('/roles', checkAuth, roleCreateValidation, RolesController.create);
app.delete('/roles/:id', checkAuth, RolesController.removeOneById);
app.patch(
	'/roles/:id',
	checkAuth,
	roleCreateValidation,
	RolesController.updateOneById
);
const port = PORT || 3000;
app.listen(port, (error) => {
	if (error) {
		return console.log('Something went wrong', error);
	}
	console.log(`Server started on port ${port}`);
});

/**
  [
    {
        "_id": "6471f9a29c17ac2190eb8791",
        "name": "PM",
        "__v": 0
    },
    {
        "_id": "6471f9ad9c17ac2190eb8793",
        "name": "Designer",
        "__v": 0
    },
    {
        "_id": "6471f9b19c17ac2190eb8795",
        "name": "QA",
        "__v": 0
    }
    
]

[
    {
        "_id": "6471fa06933513f26024a990",
        "name": "QA",
        "profileUrl": "https://chat.openai.com/",
        "createdAt": "2023-05-27T12:39:34.458Z",
        "updatedAt": "2023-05-27T12:39:34.458Z",
        "__v": 0
    },
    {
        "_id": "6471fa20933513f26024a994",
        "name": "QййA",
        "profileUrl": "https://chat.openai.com/ы",
        "createdAt": "2023-05-27T12:40:00.086Z",
        "updatedAt": "2023-05-27T12:40:00.086Z",
        "__v": 0
    },
    {
        "_id": "6471fa25933513f26024a996",
        "name": "QййxA",
        "profileUrl": "https://chat.openai.com/ыa",
        "createdAt": "2023-05-27T12:40:05.370Z",
        "updatedAt": "2023-05-27T12:40:05.370Z",
        "__v": 0
    },
    {
        "_id": "6471fa28933513f26024a998",
        "name": "QййxAs",
        "profileUrl": "https://chat.openai.com/ыas",
        "createdAt": "2023-05-27T12:40:08.244Z",
        "updatedAt": "2023-05-27T12:40:08.244Z",
        "__v": 0
    },
    {
        "_id": "6471fa2b933513f26024a99a",
        "name": "QййxAss",
        "profileUrl": "https://chat.openai.com/ыass",
        "createdAt": "2023-05-27T12:40:11.671Z",
        "updatedAt": "2023-05-27T12:40:11.671Z",
        "__v": 0
    }
]
 */
