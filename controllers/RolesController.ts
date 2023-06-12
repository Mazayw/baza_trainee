import RoleModel from '../models/Roles.js';
import { Request, Response } from 'express';
import { mergeObjects } from '../utils/updateObject.js';

export const create = async (req: Request, res: Response) => {
	const { name } = req.body;
	try {
		const doc = new RoleModel({
			name,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create role`, error });
	}
};

export const getAll = async (req: Request, res: Response) => {
	try {
		const roles = await RoleModel.find();
		res.json(roles);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get roles`, error });
	}
};

export const getOneById = async (req: Request, res: Response) => {
	try {
		const roleId = req.params.id;
		const role = await RoleModel.findById(roleId);
		if (!role) {
			return res.status(404).json({ message: 'Role not found' });
		}
		res.json(role);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get role`, error });
	}
};

export const removeOneById = async (req: Request, res: Response) => {
	try {
		const roleId = req.params.id;
		const role = await RoleModel.findOneAndRemove({ _id: roleId });
		if (!role) {
			return res.status(404).json({ message: 'Role not found' });
		}
		res.json(role);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove role card`, error });
	}
};

export const updateOneById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const updates = req.body;
		const existingDocument = await RoleModel.findById(id);

		if (!existingDocument) {
			return res.status(404).json({ message: 'Role not found' });
		}

		const updatedDocument = mergeObjects(existingDocument._doc, updates);
		await RoleModel.findByIdAndUpdate(id, updatedDocument, { new: true });

		res.json(updatedDocument);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update role`, error });
	}
};
