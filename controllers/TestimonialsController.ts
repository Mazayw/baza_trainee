import Testimonials from '../models/Testimonials.js';
import { Request, Response } from 'express';
import { deleteFileFromS3 } from './fileUpload/s3-storage.js';
import { getFileKeyFromUrl } from '../utils/getFileKeyFromUrl.js';
import { mergeObjects } from '../utils/updateObject.js';
import { SETTINGS } from '../settings';

export const create = async (req: Request, res: Response) => {
	try {
		const { name, review, date, imageUrl } = req.body;

		const image = SETTINGS.allowCreateDocumentWithoutFile
			? req.file?.location || imageUrl
			: req.file?.location;

		if (!image) {
			return res
				.status(400)
				.json({ error: 'No file or image URL found in the request body' });
		}
		const doc = new Testimonials({
			name,
			review,
			date,
			imageUrl: image,
		});

		const document = await doc.save();
		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create testimonial`, error });
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const allDocuments = await Testimonials.find();
		res.json(allDocuments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get testimonials`, error });
	}
};

export const getOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const document = await Testimonials.findById(id);
		if (!document) {
			return res.status(404).json({ message: 'Testimonial not found' });
		}
		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get testimonial`, error });
	}
};

export const removeOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const document = await Testimonials.findOneAndRemove({
			_id: id,
		});
		if (!document) {
			return res.status(404).json({ message: 'Testimonial not found' });
		}

		try {
			const fileKey = getFileKeyFromUrl(document.imageUrl);
			if (fileKey) {
				const response = await deleteFileFromS3(fileKey);
				console.log(`File ${fileKey} deleted`, response);
			}
		} catch (error) {
			console.error('Error deleting file from S3:', error);
		}

		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove testimonial card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		const existingDocument = await Testimonials.findById(id);

		if (!existingDocument) {
			return res.status(404).json({ message: 'Testimonial not found' });
		}

		const updatedDocument = mergeObjects(existingDocument._doc, updates);
		await Testimonials.findByIdAndUpdate(id, updatedDocument, { new: true });

		if (req.file?.location && existingDocument?.imageUrl) {
			try {
				const fileKey = getFileKeyFromUrl(existingDocument.imageUrl);
				if (fileKey) {
					deleteFileFromS3(fileKey);
					console.log(`${fileKey} was deleted`);
				}
			} catch (error) {
				console.error('Error deleting file from S3:', error);
			}
		}

		res.json(updatedDocument);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update testimonial`, error });
	}
};
