import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, BUCKET } = process.env;

const s3Config = new S3Client({
	region: REGION,
	credentials: {
		accessKeyId: ACCESS_KEY_ID || '',
		secretAccessKey: SECRET_ACCESS_KEY || '',
	},
});

const upload = multer({
	storage: multerS3({
		s3: s3Config,
		bucket: BUCKET || '',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, `${Date.now().toString()}-${file.originalname}`);
		},
	}),
});

export { upload };
