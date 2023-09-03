import TeamMembers from '../models/TeamMembers.js';
import { Request, Response } from 'express';
import { mergeObjects } from '../utils/mergeObject.js';

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

export const search = async (req: Request, res: Response) => {
	try {
		const { search, page, limit } = req.query;
		const searchQuery = new RegExp(search as string, 'i');

		const currentPage = parseInt(page as string) || 1;
		const itemsPerPage = parseInt(limit as string) || 10;
		const skip = (currentPage - 1) * itemsPerPage;

		const totalDocuments = await TeamMembers.countDocuments({
			$or: [
				{ 'name.en': searchQuery },
				{ 'name.pl': searchQuery },
				{ 'name.ua': searchQuery },
			],
		});

		const teamMembers = await TeamMembers.find({
			$or: [
				{ 'name.en': searchQuery },
				{ 'name.pl': searchQuery },
				{ 'name.ua': searchQuery },
			],
		})
			.sort({ 'name.ua': 1 })
			.skip(skip)
			.limit(itemsPerPage)
			.exec();

		res.json({
			results: teamMembers,
			pagination: {
				currentPage,
				totalPages: Math.ceil(totalDocuments / itemsPerPage),
				totalResults: totalDocuments,
			},
		});
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
