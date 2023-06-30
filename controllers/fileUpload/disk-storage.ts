import multer from 'multer';
import { getFileExtension } from '../../utils/getFileExtension';
import fs from 'fs';

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		const uploadDir = 'uploads';
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
		cb(null, uploadDir);
	},
	filename: (_, file, cb) => {
		cb(null, `${Date.now().toString()}.${getFileExtension(file.originalname)}`);
	},
});

const diskUpload = multer({ storage });

export { diskUpload };
