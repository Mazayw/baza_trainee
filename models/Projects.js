import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		imageUrl: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		creationDate: {
			type: Number,
			required: true,
		},
		launchDate: {
			type: Number,
			required: true,
		},
		complexity: {
			type: Number,
			required: true,
		},
		teamMembers: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Users',
				},
				role: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Roles',
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model('Projects', ProjectSchema);
