import { IProject } from './../types/index';
import { IProjectResponse } from '../types/index';
import { Types } from 'mongoose';

export const formatProjectsServerResponse = (
	projects: IProject[]
): IProjectResponse[] =>
	projects.map((project) => {
		const transformedTeamMembers = project.teamMembers.map((teamMember) => ({
			user: {
				name: teamMember.userId?.name || '',
				_id: teamMember.userId?._id || '', // Convert ObjectId to string
			},
			role: {
				name: teamMember.roleId?.name || '',
				_id: teamMember.roleId?._id || '', // Convert ObjectId to string
			},
		}));
		const transformedStack = project.stack.map((stack) => ({
			_id: stack.stackId?._id || '', // Convert ObjectId to string
			name: stack.stackId?.name || '',
		}));

		return {
			_id: project._id.toString(), // Convert ObjectId to string
			title: {
				en: project.title.en,
				pl: project.title.pl,
				ua: project.title.ua,
			},
			imageUrl: project.imageUrl,
			deployUrl: project.deployUrl,
			stack: transformedStack,
			isTeamRequired: project.isTeamRequired,
			creationDate: project.creationDate,
			launchDate: project.launchDate,
			complexity: project.complexity,
			teamMembers: transformedTeamMembers,
		} as IProjectResponse;
	});

/*
    title: {
		en: string;
		pl: string;
		ua: string;
	};
	_id: string;
	imageUrl: string;
	deployUrl?: string;
	stack: Array<{
		_id: string;
		name: string;
	}>;
	isTeamRequired: boolean;
	creationDate: number;
	launchDate: number;
	complexity: number;
	teamMembers: Array<{
		user: {
			name: string;
			_id: string;
		};
		role: {
			name: string;
			_id: string;
		};
	}>;*/
