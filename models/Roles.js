import mongoose from 'mongoose';

const TeamMemberRoleSchema = new mongoose.Schema({
	name: { type: String, required: true },
});

export default mongoose.model('TeamMemberRoles', TeamMemberRoleSchema);
