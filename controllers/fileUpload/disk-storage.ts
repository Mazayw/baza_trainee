import multer from 'multer';
import { getFileExtension } from '../../utils/getFileExtension';
import fs from 'fs';
import { Request, Response } from 'express';
import { SETTINGS } from '../../settings';

const uploadDir = SETTINGS.fileUploadFolderName;

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
		cb(null, uploadDir);
	},
	filename: (_, file, cb) => {
		cb(null, `${Date.now().toString()}.${getFileExtension(file.originalname)}`);
	},
});

const getFile = (req: Request, res: Response) => {
	const filename = req.params.filename;
	res.sendFile(filename, { root: `${uploadDir}/` }, (err) => {
		if (err) {
			console.error('Error sending file:', err);
			res.status(404).json({
				message: 'File not found',
			});
		}
	});
};

const deleteFile = (fileName: string) => {
	fs.unlink(`${uploadDir}/${fileName}`, (err) => {
		if (err) {
			console.error(`Error deleting file: ${fileName}`, err);
		} else {
			console.log(`File ${fileName} deleted successfully`);
		}
	});
};

const diskUpload = multer({ storage });

export { diskUpload, getFile, deleteFile };
