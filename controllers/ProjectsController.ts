import ProjectModel from '../models/Projects.js';
import RoleModel from '../models/Roles.js';
import StackModel from '../models/Stacks.js';
import TeamMembers from '../models/TeamMembers.js';
import { Request, Response } from 'express';
import { SETTINGS } from '../settings.js';
import { IProjectTeamMember } from '../types/index.js';
import { IStack } from '../types/index';
import { getFileKeyFromUrl } from '../utils/getFileKeyFromUrl.js';
import { deleteFileFromS3 } from './fileUpload/s3-storage.js';
import { mergeObjects } from '../utils/updateObject.js';
//ToDo Refactor

export const getAll = async (req: Request, res: Response) => {
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
			.populate({
				path: 'stack',
				populate: {
					path: 'stackId',
					select: 'name',
					model: StackModel,
				},
			})
			.exec();

		const transformedProject = projects.map((project) => {
			const transformedTeamMembers = project.teamMembers.map(
				(teamMember: IProjectTeamMember) => ({
					user: teamMember.userId,
					role: teamMember.roleId,
				})
			);
			const transformedStack = project.stack.map((stack: IStack) => ({
				_id: stack.stackId['_id'],
				name: stack.stackId.name,
			}));

			return {
				...project.toObject(),
				teamMembers: transformedTeamMembers,
				stack: transformedStack,
			};
		});

		res.json(transformedProject);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get projects cards`, error });
	}
};

export const create = async (req: Request, res: Response) => {
	const {
		title,
		imageUrl,
		deployUrl,
		stack,
		isTeamRequired,
		creationDate,
		launchDate,
		complexity,
		teamMembers,
	} = req.body;

	const image = SETTINGS.allowCreateDocumentWithoutFile
		? req.file?.location || imageUrl
		: req.file?.location;

	try {
		const doc = new ProjectModel({
			title,
			imageUrl: image,
			deployUrl,
			stack,
			isTeamRequired,
			creationDate,
			launchDate,
			complexity,
			teamMembers,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create project card`, error });
	}
};

export const getOneById = async (req: Request, res: Response) => {
	try {
		const projectId = req.params.id;
		const project = await ProjectModel.find({ _id: projectId })
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
			.populate({
				path: 'stack',
				populate: {
					path: 'stackId',
					select: 'name',
					model: StackModel,
				},
			})
			.exec();

		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		const transformedProject = project.map((project) => {
			const transformedTeamMembers = project.teamMembers.map(
				(teamMember: IProjectTeamMember) => ({
					user: teamMember.userId,
					role: teamMember.roleId,
				})
			);
			const transformedStack = project.stack.map((stack: IStack) => ({
				_id: stack.stackId['_id'],
				name: stack.stackId.name,
			}));

			return {
				...project.toObject(),
				teamMembers: transformedTeamMembers,
				stack: transformedStack,
			};
		});

		res.json(...transformedProject);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get project`, error });
	}
};

export const removeOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const document = await ProjectModel.findOneAndRemove({
			_id: id,
		});
		if (!document) {
			return res.status(404).json({ message: 'Project not found' });
		}

		try {
			const fileKey = getFileKeyFromUrl(document.imageUrl);
			if (fileKey) {
				const response = await deleteFileFromS3(fileKey);
				console.log(`File ${fileKey} deleted`, response);
			}
		} catch (error) {
			console.error('Error deleting file from S3:', error);
		}

		res.json(document);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove project card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		const existingDocument = await ProjectModel.findById(id);

		if (!existingDocument) {
			return res.status(404).json({ message: 'Project not found' });
		}

		const updatedDocument = mergeObjects(existingDocument._doc, updates);
		await ProjectModel.findByIdAndUpdate(id, updatedDocument, { new: true });

		if (req.file?.location && existingDocument?.imageUrl) {
			try {
				const fileKey = getFileKeyFromUrl(existingDocument.imageUrl);
				if (fileKey) {
					deleteFileFromS3(fileKey);
					console.log(`${fileKey} was deleted`);
				}
			} catch (error) {
				console.error('Error deleting file from S3:', error);
			}
		}

		res.json(updatedDocument);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update project`, error });
	}
};
