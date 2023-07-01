import { Request } from 'express';

export const getFilePath = (req: Request) => {
	return req.file?.filename || req.file?.location;
};
