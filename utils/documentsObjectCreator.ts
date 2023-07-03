export const documentsObjectCreator = (files: Express.Multer.File[]) => {
	const result: Record<string, any> = {};

	for (const item of files) {
		const { fieldname, filename } = item;
		if (fieldname.includes('[')) {
			const [fieldName, nestedKey] = fieldname.split(/[\[\]]/).filter(Boolean);
			result[fieldName] = result[fieldName] || {};
			result[fieldName][nestedKey] = filename;
		} else {
			result[fieldname] = filename;
		}
	}
	return result;
};
