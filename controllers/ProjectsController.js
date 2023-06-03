import ProjectModel from '../models/Projects.js';
import RoleModel from '../models/Roles.js';
import TeamMembers from '../models/TeamMembers.js';

export const getAll = async (req, res) => {
	try {
		const projects = await ProjectModel.find()
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
			})
			.exec();

		const transformedProjects = projects.map((project) => {
			const transformedTeamMembers = project.teamMembers.map((teamMember) => ({
				user: teamMember.userId,
				role: teamMember.roleId,
			}));

			return { ...project.toObject(), teamMembers: transformedTeamMembers };
		});

		res.json(transformedProjects);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get projects cards`, error });
	}
};

export const create = async (req, res) => {
	const {
		imageUrl,
		status,
		description,
		creationDate,
		launchDate,
		complexity,
		teamMembers,
		title,
	} = req.body;
	try {
		const doc = new ProjectModel({
			imageUrl,
			status,
			description,
			creationDate,
			launchDate,
			complexity,
			teamMembers,
			title,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create project card`, error });
	}
};

export const getOneById = async (req, res) => {
	try {
		const projectId = req.params.id;
		const project = await ProjectModel.findById(projectId)
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
			})
			.exec();

		const transformedProjects = projects.map((project) => {
			const transformedTeamMembers = project.teamMembers.map((teamMember) => ({
				user: teamMember.userId,
				role: teamMember.roleId,
			}));

			return { ...project.toObject(), teamMembers: transformedTeamMembers };
		});

		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		res.json(transformedProjects);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get project`, error });
	}
};

export const removeOneById = async (req, res) => {
	try {
		const projectId = req.params.id;
		const project = await ProjectModel.findOneAndRemove({ _id: projectId });
		if (!project) {
			return res.status(404).json({ message: 'Project card not found' });
		}
		res.json(project);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove project`, error });
	}
};

export const updateOneById = async (req, res) => {
	try {
		const {
			imageUrl,
			status,
			description,
			creationDate,
			launchDate,
			complexity,
			teamMembers,
			title,
		} = req.body;
		const projectId = req.params.id;
		const project = await ProjectModel.findOneAndUpdate(
			{ _id: projectId },
			{
				imageUrl,
				status,
				description,
				creationDate,
				launchDate,
				complexity,
				teamMembers,
				title,
			},
			{ new: true }
		);
		if (!project) {
			return res.status(404).json({ message: 'Project card not found' });
		}
		res.json(project);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update project`, error });
	}
};
