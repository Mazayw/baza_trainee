import PartnerModel from '../models/Partner.js';

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
		const doc = new PartnerModel({
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

export const getAll = async (req, res) => {
	try {
		const partners = await PartnerModel.find();
		res.json(partners);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get partners cards`, error });
	}
};
