import StackModel from '../models/Stacks.js';
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
	const { name } = req.body;
	try {
		const doc = new StackModel({
			name,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create stack`, error });
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const documents = await StackModel.find();
		res.json(documents);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get stacks`, error });
	}
};

export const getOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const document = await StackModel.findById(id);
		if (!document) {
			return res.status(404).json({ message: 'Stack not found' });
		}
		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get stack`, error });
	}
};

export const removeOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const document = await StackModel.findOneAndRemove({ _id: id });
		if (!document) {
			return res.status(404).json({ message: 'Stack not found' });
		}
		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove stack card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		const existingDocument = await StackModel.findById(id);

		if (!existingDocument) {
			return res.status(404).json({ message: 'Stack not found' });
		}

		const updatedDocument = await StackModel.findByIdAndUpdate(id, updates, {
			new: true,
		});

		res.json(updatedDocument);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update stack`, error });
	}
};
