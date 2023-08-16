import { Query } from 'mongoose';

export const populateProject = (query: Query<any, any>) =>
	query
		.populate({
			path: 'teamMembers.teamMember',
			model: 'TeamMembers',
			select: 'name profileUrl',
		})
		.populate({
			path: 'teamMembers.teamMemberRole',
			model: 'TeamMemberRoles',
			select: 'name',
		});
