import { Request, Response } from 'express';
import DocsModel from '../models/Docs';
import { documentsObjectCreator } from '../utils/documentsObjectCreator';
import { mergeObjects } from '../utils/mergeObject';
import { deleteFilesInObject } from '../utils/deleteFilesInObject';

export const getDocs = async (req: Request, res: Response) => {
	try {
		const Data = await DocsModel.findOne();
		if (Data) {
			res.status(200).json({ docs: Data.docs });
		} else {
			res.status(404).json({ message: 'Documents data not found' });
		}
	} catch (error) {
		console.error('Error retrieving documents data', error);
		res
			.status(500)
			.json({ error: 'An error occurred while retrieving documents data' });
	}
};

export const updateDocs = async (req: Request, res: Response) => {
	const newDocs =
		documentsObjectCreator(req?.files as Express.Multer.File[]) || [];
	const oldDocs = await DocsModel.findOne({});
	const docs = oldDocs ? mergeObjects(oldDocs.docs, newDocs) : newDocs;

	try {
		const updatedDocs = await DocsModel.findOneAndUpdate(
			{},
			{ docs },
			{ upsert: true, new: true }
		);

		if (updatedDocs) {
			if (updatedDocs.isNew) {
				res.status(201).json({
					message: 'Documents data created successfully',
					docs: updatedDocs.docs,
				});
			} else {
				oldDocs?.docs && deleteFilesInObject(oldDocs.docs, newDocs);
				res.status(200).json({
					message: 'Documents data updated successfully',
					docs: updatedDocs.docs,
				});
			}
		}
	} catch (error) {
		console.error('Error saving documents data', error);
		res.status(500).json({
			error: 'An error occurred while saving documents data',
		});
	}
};
