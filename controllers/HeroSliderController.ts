import HeroSlider from '../models/HeroSlider.js';
import { Request, Response } from 'express';
import { deleteFileFromS3 } from './fileUpload/s3-storage.js';
import { getFileKeyFromUrl } from '../utils/getFileKeyFromUrl.js';
import { mergeObjects } from '../utils/updateObject.js';
import { SETTINGS } from '../settings';

export const create = async (req: Request, res: Response) => {
	try {
		const { title, subtitle, imageUrl } = req.body;

		const image = SETTINGS.allowCreateDocumentWithoutFile
			? req.file?.location || imageUrl
			: req.file?.location;

		if (!image) {
			return res
				.status(400)
				.json({ error: 'No file or image URL found in the request body' });
		}
		const doc = new HeroSlider({
			title,
			subtitle,
			imageUrl: image,
		});

		const allDocuments = await HeroSlider.find();

		if (allDocuments.length >= SETTINGS.maxNumberOfItems.heroSlider) {
			res.status(409).json({
				message: `Maximum item count reached in the database. Please delete an existing document before creating a new one. Current limit is ${SETTINGS.maxNumberOfItems.heroSlider} items`,
			});
		}

		const document = await doc.save();
		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create hero slider item`, error });
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const allDocuments = await HeroSlider.find();
		res.json(allDocuments);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get hero slider items`, error });
	}
};

export const getOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const document = await HeroSlider.findById(id);
		if (!document) {
			return res.status(404).json({ message: 'Hero slider item not found' });
		}
		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get hero slider item`, error });
	}
};

export const removeOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const document = await HeroSlider.findOneAndRemove({
			_id: id,
		});
		if (!document) {
			return res.status(404).json({ message: 'hero slider item not found' });
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
		res.status(500).json({ message: `Can't remove hero slider item`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		const existingDocument = await HeroSlider.findById(id);

		if (!existingDocument) {
			return res.status(404).json({ message: 'Hero slider item not found' });
		}

		const updatedDocument = mergeObjects(existingDocument._doc, updates);
		await HeroSlider.findByIdAndUpdate(id, updatedDocument, { new: true });

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
		res.status(500).json({ message: `Can't update hero slider item`, error });
	}
};
