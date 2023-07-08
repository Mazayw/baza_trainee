import { Query } from 'mongoose';
import RoleModel from '../models/Roles.js';
import TeamMembers from '../models/TeamMembers.js';

export const populateProject = (query: Query<any, any>) =>
	query
		.populate({
			path: 'teamMembers',
			populate: {
				path: 'userId',
				select: 'name',
				model: TeamMembers,
			},
		})
		.populate({
			path: 'teamMembers',
			populate: {
				path: 'roleId',
				select: 'name',
				model: RoleModel,
			},
		});
