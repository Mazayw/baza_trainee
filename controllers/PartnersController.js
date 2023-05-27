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
