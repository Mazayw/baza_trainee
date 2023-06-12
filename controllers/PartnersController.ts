import PartnerModel from '../models/Partners.js';
import { Request, Response } from 'express';
import { getFileKeyFromUrl } from '../utils/getFileKeyFromUrl.js';
import { mergeObjects } from '../utils/updateObject.js';
import { deleteFileFromS3 } from './fileUpload/s3-storage.js';
import { SETTINGS } from '../settings.js';

export const create = async (req: Request, res: Response) => {
	try {
		const { name, homeUrl, imageUrl } = req.body;

		const image = SETTINGS.allowCreateDocumentWithoutFile
			? req.file?.location || imageUrl
			: req.file?.location;

		if (!image) {
			return res
				.status(400)
				.json({ error: 'No file or image URL found in the request body' });
		}
		const doc = new PartnerModel({
			homeUrl,
			imageUrl: image,
		});

		const document = await doc.save();
		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create partner`, error });
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const partners = await PartnerModel.find();
		res.json(partners);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get partners cards`, error });
	}
};

export const getOneById = async (req: Request, res: Response) => {
	try {
		const partnerId = req.params.id;
		const partner = await PartnerModel.findById(partnerId);
		if (!partner) {
			return res.status(404).json({ message: 'Partner card not found' });
		}
		res.json(partner);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get partner card`, error });
	}
};

export const removeOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const document = await PartnerModel.findOneAndRemove({
			_id: id,
		});
		if (!document) {
			return res.status(404).json({ message: 'Partner not found' });
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
		res.status(500).json({ message: `Can't remove partner card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		const existingDocument = await PartnerModel.findById(id);

		if (!existingDocument) {
			return res.status(404).json({ message: 'Partner not found' });
		}

		const updatedDocument = mergeObjects(existingDocument._doc, updates);
		await PartnerModel.findByIdAndUpdate(id, updatedDocument, { new: true });

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
		res.status(500).json({ message: `Can't update partner`, error });
	}
};
