import TeamMembers from '../models/TeamMembers.js';
import { Request, Response } from 'express';
import { mergeObjects } from '../utils/updateObject.js';

export const create = async (req: Request, res: Response) => {
	const { name, profileUrl } = req.body;
	try {
		const doc = new TeamMembers({
			name,
			profileUrl,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create member`, error });
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const members = await TeamMembers.find();
		res.json(members);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get members`, error });
	}
};

export const getOneById = async (req: Request, res: Response) => {
	try {
		const memberId = req.params.id;
		const member = await TeamMembers.findById(memberId);
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}
		res.json(member);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get member`, error });
	}
};

export const removeOneById = async (req: Request, res: Response) => {
	try {
		const memberId = req.params.id;
		const member = await TeamMembers.findOneAndRemove({ _id: memberId });
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}
		res.json(member);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove member card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		const existingDocument = await TeamMembers.findById(id);

		if (!existingDocument) {
			return res.status(404).json({ message: 'Member not found' });
		}

		const updatedDocument = mergeObjects(existingDocument._doc, updates);
		await TeamMembers.findByIdAndUpdate(id, updatedDocument, { new: true });

		res.json(updatedDocument);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update member`, error });
	}
};
