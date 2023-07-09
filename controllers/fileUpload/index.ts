import { SETTINGS } from '../../settings';
import { diskUpload } from './disk-storage';
import { s3Upload } from './s3-storage';
import { Request, Response, NextFunction } from 'express';

const uploadWithFileSizeValidation =
	(type = 'single') =>
	(req: Request, res: Response, next: NextFunction): void => {
		const skipUpload = Boolean(req.headers['skip-upload']);
		if (!req.file && skipUpload) {
			next();
		}

		let upload;
		switch (SETTINGS.fileUploadMethod) {
			case 's3':
				upload = s3Upload;
				break;
			default:
				upload = diskUpload;
				break;
		}

		switch (type) {
			case 'any':
				upload = upload.any();
				break;
			default:
				upload = upload.single('file');
				break;
		}

		upload(req, res, function (err) {
			if (err) {
				console.log('Error uploading file:', err);
				res.status(500).json({ error: 'Internal server error' });
			} else {
				next();
			}
		});
	};

export { uploadWithFileSizeValidation };
