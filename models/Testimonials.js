import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		review: {
			type: String,
			required: true,
		},
		date: {
			type: Number,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('TestimonialsSchema', TestimonialSchema);
