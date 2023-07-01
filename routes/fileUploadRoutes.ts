import { Router } from 'express';
import multer from 'multer';
import checkAuth from '../utils/checkAuth.js';
import { getFile } from '../controllers/fileUpload/disk-storage.js';

const router = Router();
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

router.post('/', checkAuth, upload.single('image'), (req, res) => {
	res.json({ url: `/uploads/${req.file!.originalname}` });
});

router.get('/:filename', getFile);

export default router;
