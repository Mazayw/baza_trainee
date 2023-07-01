import { Request } from 'express';

export const isUrlOrFilename = (str: string, req: Request) => {
	const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
	const serverUrl = `${req.protocol}://${req.hostname}/files/`;
	if (urlPattern.test(str)) {
		return str;
	} else {
		return serverUrl + str;
	}
};
