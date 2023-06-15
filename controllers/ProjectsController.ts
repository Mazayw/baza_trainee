import ProjectModel from '../models/Projects.js';
import { Request, Response } from 'express';
import { SETTINGS } from '../settings.js';
import { getFileKeyFromUrl } from '../utils/getFileKeyFromUrl.js';
import { deleteFileFromS3 } from './fileUpload/s3-storage.js';
import { mergeObjects } from '../utils/updateObject.js';
import { formatProjectsServerResponse } from '../utils/formatProjectsServerResponse.js';
import { populateProject } from '../utils/populateProjects.js';

export const getAll = async (req: Request, res: Response) => {
	try {
		const projects = await populateProject(ProjectModel.find()).exec();
		const transformedProjects = formatProjectsServerResponse(projects);
		res.json(transformedProjects);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't get project cards`, error });
	}
};

export const search = async (req: Request, res: Response) => {
	try {
		const { query, page, limit } = req.query;
		const searchQuery = new RegExp(query as string, 'i');

		const currentPage = parseInt(page as string) || 1;
		const itemsPerPage = parseInt(limit as string) || 9;
		const skip = (currentPage - 1) * itemsPerPage;

		const totalDocuments = await ProjectModel.countDocuments({
			$or: [
				{ 'title.en': searchQuery },
				{ 'title.pl': searchQuery },
				{ 'title.ua': searchQuery },
			],
		});

		const projects = await populateProject(
			ProjectModel.find({
				$or: [
					{ 'title.en': searchQuery },
					{ 'title.pl': searchQuery },
					{ 'title.ua': searchQuery },
				],
			})
				.skip(skip)
				.limit(itemsPerPage)
		).exec();

		const transformedProjects = formatProjectsServerResponse(projects);

		res.json({
			results: transformedProjects,
			pagination: {
				currentPage,
				totalPages: Math.ceil(totalDocuments / itemsPerPage),
				totalResults: totalDocuments,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
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
		const project = new ProjectModel({
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

		const savedProject = await project.save();
		res.json(savedProject);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't create project card`, error });
	}
};

export const getOneById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const project = await populateProject(
			ProjectModel.findOne({ _id: id })
		).exec();

		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		const transformedProject = formatProjectsServerResponse([project]);

		res.json(...transformedProject);
	} catch (error) {
		console.error(error);
		res.status(404).json({ message: `Can't get project`, error });
	}
};

export const removeOneById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const project = await ProjectModel.findOneAndRemove({ _id: id });

		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		try {
			const fileKey = getFileKeyFromUrl(project.imageUrl);
			if (fileKey) {
				const response = await deleteFileFromS3(fileKey);
				console.log(`File ${fileKey} deleted`, response);
			}
		} catch (error) {
			console.error('Error deleting file from S3:', error);
		}

		res.json(project);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't remove project card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const existingProject = await ProjectModel.findById(id);

		if (!existingProject) {
			return res.status(404).json({ message: 'Project not found' });
		}

		const updatedProject = mergeObjects(existingProject._doc, updates);
		await ProjectModel.findByIdAndUpdate(id, updatedProject, { new: true });

		if (req.file?.location && existingProject.imageUrl) {
			try {
				const fileKey = getFileKeyFromUrl(existingProject.imageUrl);
				if (fileKey) {
					deleteFileFromS3(fileKey);
					console.log(`${fileKey} was deleted`);
				}
			} catch (error) {
				console.error('Error deleting file from S3:', error);
			}
		}

		res.json(updatedProject);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't update project`, error });
	}
};
