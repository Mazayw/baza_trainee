import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const { PORT, USER_NAME, PASSWORD } = process.env;

const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.2x4mz6m.mongodb.net/blog?retryWrites=true&w=majority`;

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
