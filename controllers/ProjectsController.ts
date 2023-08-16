import ProjectModel from '../models/Projects.js';
import { Request, Response } from 'express';
import { SETTINGS } from '../settings.js';
import { mergeObjects } from '../utils/mergeObject.js';
import { formatProjectsServerResponse } from '../utils/formatProjectsServerResponse.js';
import { populateProject } from '../utils/populateProjects.js';
import { getFilePath } from '../utils/getFilePath.js';
import { deleteFile } from './fileUpload/disk-storage.js';

export const getAll = async (req: Request, res: Response) => {
	try {
		const projects = await populateProject(ProjectModel.find())
			.sort({ _id: -1 })
			.exec();
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
				.sort({ _id: -1 })
				.skip(skip)
				.limit(itemsPerPage)
		).exec();

		const transformedProjects = formatProjectsServerResponse(projects);

		res.json({
			results: projects,
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
		? getFilePath(req) || imageUrl
		: getFilePath(req);

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
		const document = await ProjectModel.findOneAndRemove({ _id: id });

		if (!document) {
			return res.status(404).json({ message: 'Project not found' });
		}
		deleteFile(document.imageUrl);
		/*
		try {
			const fileKey = getFileKeyFromUrl(project.imageUrl);
			if (fileKey) {
				const response = await deleteFileFromS3(fileKey);
				console.log(`File ${fileKey} deleted`, response);
			}
		} catch (error) {
			console.error('Error deleting file from S3:', error);
		}*/

		res.json(document);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't remove project card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updates = req.file?.filename
			? { ...req.body, imageUrl: req.file?.filename }
			: req.body;
		const existingDocument = await ProjectModel.findById(id);

		if (!existingDocument) {
			return res.status(404).json({ message: 'Project not found' });
		}

		const updatedProject = mergeObjects(existingDocument._doc, updates);
		await ProjectModel.findByIdAndUpdate(id, updatedProject, { new: true });

		if (req.file?.location && existingDocument.imageUrl)
			deleteFile(existingDocument.imageUrl);
		/* {
			try {
				const fileKey = getFileKeyFromUrl(existingProject.imageUrl);
				if (fileKey) {
					deleteFileFromS3(fileKey);
					console.log(`${fileKey} was deleted`);
				}
			} catch (error) {
				console.error('Error deleting file from S3:', error);
			}
		}*/

		res.json(updatedProject);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't update project`, error });
	}
};
