import multer from 'multer';
import { SETTINGS } from '../../settings';
import { diskUpload } from './disk-storage';
import { s3Upload } from './s3-storage';
import { Request, Response, NextFunction } from 'express';

const uploadWithFileSizeValidation =
	(fileSizeLimit: number) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const contentLength = Number(req.headers['content-length']);
		const skipUpload = Boolean(req.headers['skip-upload']);
		if (!req.file && skipUpload) {
			next();
		}

		let upload: multer.Multer;
		switch (SETTINGS.fileUploadMethod) {
			case 's3':
				upload = s3Upload;
				break;
			default:
				upload = diskUpload;
				break;
		}

		if (contentLength && contentLength > fileSizeLimit) {
			res.status(400).json({
				error: `File size exceeds the allowed limit. File size is ${contentLength}, limit is ${fileSizeLimit}`,
			});
		} else {
			upload.single('file')(req, res, function (err) {
				if (err) {
					console.log('Error uploading file:', err);
					res.status(500).json({ error: 'Internal server error' });
				} else {
					next();
				}
			});
		}
	};

export { uploadWithFileSizeValidation };
