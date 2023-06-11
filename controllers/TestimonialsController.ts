import Testimonials from '../models/Testimonials.js';
import { Request, Response } from 'express';
import { deleteFileFromS3 } from './fileUpload/s3-storage.js';
import { getFileKeyFromUrl } from '../utils/getFileKeyFromUrl.js';

export interface IMulterRequestFile {
	key: string;
	path: string;
	mimetype: string;
	originalname: string;
	size: number;
	location: string;
}

export const create = async (req: Request, res: Response) => {
	const { name, review, date } = req.body;
	const imageUrl = req.file.location;

	try {
		const doc = new Testimonials({
			name,
			review,
			date,
			imageUrl,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create testimonial`, error });
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const testimonial = await Testimonials.find();
		res.json(testimonial);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get testimonials`, error });
	}
};

export const getOneById = async (req: Request, res: Response) => {
	try {
		const testimonialId = req.params.id;
		const testimonial = await Testimonials.findById(testimonialId);
		if (!testimonial) {
			return res.status(404).json({ message: 'Testimonial not found' });
		}
		res.json(testimonial);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get testimonial`, error });
	}
};

export const removeOneById = async (req: Request, res: Response) => {
	try {
		const testimonialId = req.params.id;
		const testimonial = await Testimonials.findOneAndRemove({
			_id: testimonialId,
		});
		if (!testimonial) {
			return res.status(404).json({ message: 'Testimonial not found' });
		}

		try {
			const fileKey = getFileKeyFromUrl(testimonial.imageUrl);
			if (fileKey) {
				console.log(fileKey);
				const response = await deleteFileFromS3(fileKey);
				console.log(response);
			}
		} catch (error) {
			console.error('Error deleting file from S3:', error);
		}

		res.json(testimonial);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove testimonial card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const { name, review, date } = req.body;
		const testimonialId = req.params.id;
		const oldTestimonial = await Testimonials.findById(testimonialId);
		const imageUrl = req.body.imageUrl ? req.body.imageUrl : req.file.location;
		const testimonial = await Testimonials.findOneAndUpdate(
			{ _id: testimonialId },
			{
				name,
				review,
				date,
				imageUrl,
			},
			{ new: true }
		);

		if (!testimonial) {
			return res.status(404).json({ message: 'Testimonial not found' });
		}

		if (req.file.location && oldTestimonial?.imageUrl) {
			try {
				const fileKey = getFileKeyFromUrl(oldTestimonial.imageUrl);
				if (fileKey) {
					deleteFileFromS3(fileKey);
				}
			} catch (error) {
				console.error('Error deleting file from S3:', error);
			}
		}

		res.json(testimonial);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update testimonial`, error });
	}
};
