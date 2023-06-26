import { Request, Response } from 'express';
import AchievementsModel from '../models/Achievements';
import ProjectModel from '../models/Projects.js';
import TeamMembers from '../models/TeamMembers.js';

export const getEmployed = async (req: Request, res: Response) => {
	try {
		const achievementsData = await AchievementsModel.findOne();
		if (achievementsData) {
			res.status(200).json({ employed: achievementsData.employed });
		} else {
			res.status(404).json({ message: 'Employed data not found' });
		}
	} catch (error) {
		console.error('Error retrieving employed data', error);
		res
			.status(500)
			.json({ error: 'An error occurred while retrieving employed data' });
	}
};

export const getAchievements = async (req: Request, res: Response) => {
	try {
		const projects = await ProjectModel.find({ launchDate: { $exists: true } });
		const members = await TeamMembers.find();
		const achievementsData = await AchievementsModel.findOne();

		if (achievementsData) {
			res.status(200).json({
				projects: projects.length || 0,
				members: members.length || 0,
				employed: achievementsData.employed || 0,
			});
		} else {
			res.status(404).json({ message: "Can't get achievements data" });
		}
	} catch (error) {
		console.error('Error retrieving contacts data', error);
		res
			.status(500)
			.json({ error: 'An error occurred while retrieving achievements data' });
	}
};

export const updateAchievements = async (req: Request, res: Response) => {
	try {
		const employedData = req.body.employed;

		const updatedAchievements = await AchievementsModel.findOneAndUpdate(
			{},
			{ employed: employedData },
			{ upsert: true, new: true }
		);

		if (updatedAchievements) {
			if (updatedAchievements.isNew) {
				res.status(201).json({
					message: 'Achievements data created successfully',
					employed: updatedAchievements.employed,
				});
			} else {
				res.status(200).json({
					message: 'Achievements data updated successfully',
					employed: updatedAchievements.employed,
				});
			}
		}
	} catch (error) {
		console.error('Error saving contacts data', error);
		res.status(500).json({
			error: 'An error occurred while saving achievements data',
		});
	}
};
