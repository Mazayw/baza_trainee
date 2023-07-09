import { deleteFile } from '../../controllers/fileUpload/disk-storage';

const fileTypes = {
	image: {
		types: ['image/jpeg', 'image/png', 'image/webp'],
		description: '.jpeg, .png, .webp',
	},
	document: { types: ['application/pdf'], description: '.pdf' },
};

export const fileValidation = (
	file: Express.Multer.File,
	maxFileSize: number,
	fileType: 'image' | 'document'
) => {
	console.log(file);
	console.log(1111);
	if (!file) {
		throw new Error('No file was uploaded');
	}

	if (!fileTypes[fileType].types.includes(file.mimetype)) {
		throw new Error(
			`The file type of ${file.originalname} should be an ${fileType} (${fileTypes[fileType].description}).`
		);
	}

	if (file.size > maxFileSize) {
		throw new Error(
			`File size of ${file.originalname} exceeded the maximum limit of ${maxFileSize} bytes`
		);
	}
	return true;
};
