import Testimonials from '../models/Testimonials.js';

export const create = async (req, res) => {
	const { name, review, date, imageUrl } = req.body;
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

export const getAll = async (req, res) => {
	try {
		const testimonial = await Testimonials.find();
		res.json(testimonial);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get testimonials`, error });
	}
};

export const getOneById = async (req, res) => {
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

export const removeOneById = async (req, res) => {
	try {
		const testimonialId = req.params.id;
		const testimonial = await Testimonials.findOneAndRemove({
			_id: testimonialId,
		});
		if (!testimonial) {
			return res.status(404).json({ message: 'Testimonial not found' });
		}
		res.json(testimonial);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove testimonial card`, error });
	}
};

export const updateOneById = async (req, res) => {
	try {
		const { name, review, date, imageUrl } = req.body;
		const testimonialId = req.params.id;
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
		res.json(testimonial);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update testimonial`, error });
	}
};
