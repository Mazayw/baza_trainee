import PartnerModel from '../models/Partner.js';

export const create = async (req, res) => {
	const { name, homeUrl, imageUrl } = req.body;
	try {
		const doc = new PartnerModel({
			name,
			homeUrl,
			imageUrl,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create partner card`, error });
	}
};

export const getAll = async (req, res) => {
	try {
		const partners = await PartnerModel.find(); //populate.('user').exec()
		res.json(partners);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get partners cards`, error });
	}
};

export const getOneById = async (req, res) => {
	try {
		const partnerId = req.params.id;
		const partner = await PartnerModel.findById(partnerId);
		if (!partner) {
			return res.status(404).json({ message: 'Partner card not found' });
		}
		res.json(partner);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get partner card`, error });
	}
};

export const removeOneById = async (req, res) => {
	try {
		const partnerId = req.params.id;
		const partner = await PartnerModel.findOneAndRemove(partnerId);
		if (!partner) {
			return res.status(404).json({ message: 'Partner card not found' });
		}
		res.json(partner);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove partner card`, error });
	}
};

export const updateOneById = async (req, res) => {
	try {
		const { name, homeUrl, imageUrl } = req.body;
		const partnerId = req.params.id;
		const partner = await PartnerModel.findOneAndUpdate(
			{ _id: partnerId },
			{
				name,
				homeUrl,
				imageUrl,
			},
			{ new: true }
		);
		if (!partner) {
			return res.status(404).json({ message: 'Partner card not found' });
		}
		res.json(partner);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update partner card`, error });
	}
};
