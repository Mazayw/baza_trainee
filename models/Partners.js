import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		homeUrl: {
			type: String,
		},
		imageUrl: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Partners', PartnerSchema);
