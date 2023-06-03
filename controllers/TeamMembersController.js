import TeamMembers from '../models/TeamMembers.js';

export const create = async (req, res) => {
	const { name, profileUrl } = req.body;
	try {
		const doc = new TeamMembers({
			name,
			profileUrl,
		});

		const post = await doc.save();
		res.json(post);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't create member`, error });
	}
};

export const getAll = async (req, res) => {
	try {
		const members = await TeamMembers.find();
		res.json(members);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't get members`, error });
	}
};

export const getOneById = async (req, res) => {
	try {
		const memberId = req.params.id;
		const member = await TeamMembers.findById(memberId);
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}
		res.json(member);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: `Can't get member`, error });
	}
};

export const removeOneById = async (req, res) => {
	try {
		const memberId = req.params.id;
		const member = await TeamMembers.findOneAndRemove({ _id: memberId });
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}
		res.json(member);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't remove member card`, error });
	}
};

export const updateOneById = async (req, res) => {
	try {
		const { name, profileUrl } = req.body;
		const memberId = req.params.id;
		const member = await TeamMembers.findOneAndUpdate(
			{ _id: memberId },
			{
				name,
				profileUrl,
			},
			{ new: true }
		);
		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}
		res.json(member);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: `Can't update member`, error });
	}
};
