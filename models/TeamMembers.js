import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		profileUrl: {
			type: String,
			unique: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model('TeamMembers', TeamMemberSchema);
