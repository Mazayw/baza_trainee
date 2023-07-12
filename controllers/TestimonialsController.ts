import Testimonials from '../models/Testimonials.js';
import { Request, Response } from 'express';
import { mergeObjects } from '../utils/mergeObject.js';
import { SETTINGS } from '../settings';
import { getFilePath } from '../utils/getFilePath.js';
import { deleteFile } from './fileUpload/disk-storage.js';

export const create = async (req: Request, res: Response) => {
	try {
		const { name, review, role, imageUrl } = req.body;
		const image = SETTINGS.allowCreateDocumentWithoutFile
			? getFilePath(req) || imageUrl
			: getFilePath(req);

		if (!image) {
			return res.status(400).json({
				message: 'No file or image URL found in the request body',
			});
		}
		const doc = new Testimonials({
			name,
			review,
			role,
			imageUrl: image,
		});

		const allDocuments = await Testimonials.find();

		if (allDocuments.length >= SETTINGS.maxNumberOfItems.testimonialsSlider) {
			res.status(409).json({
				message: `Maximum item count reached in the database. Please delete an existing document before creating a new one. Current limit is ${SETTINGS.maxNumberOfItems.testimonialsSlider} items`,
			});
		} else {
			const document = await doc.save();
			res.status(201).json(document);
		}
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

		deleteFile(document.imageUrl);

		/*try {
			const fileKey = getFileKeyFromUrl(document.imageUrl);
			if (fileKey) {
				const response = await deleteFileFromS3(fileKey);
				console.log(`File ${fileKey} deleted`, response);
			}
		} catch (error) {
			console.error('Error deleting file from S3:', error);
		}*/

		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove testimonial card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		const existingDocument = await Testimonials.findById(id);

		const updates = req.file?.filename
			? { ...req.body, imageUrl: req.file?.filename }
			: req.body;

		if (!existingDocument) {
			return res.status(404).json({ message: 'Testimonial not found' });
		}

		const updatedDocument = mergeObjects(existingDocument._doc, updates);
		await Testimonials.findByIdAndUpdate(id, updatedDocument, { new: true });

		if (req.file?.filename && existingDocument?.imageUrl) {
			deleteFile(existingDocument.imageUrl);
			/*try {
				const fileKey = existingDocument.imageUrl;
				if (fileKey) {
					deleteFile(existingDocument.imageUrl);
					console.log(`${fileKey} was deleted`);
				}
			} catch (error) {
				console.error('Error deleting file:', error);
			}*/
		}

		res.json(updatedDocument);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update testimonial`, error });
	}
};
