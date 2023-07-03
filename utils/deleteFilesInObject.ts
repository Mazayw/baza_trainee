import { deleteFile } from '../controllers/fileUpload/disk-storage';

export const deleteFilesInObject = <T extends Record<string, any>>(
	previousObject: T,
	updatedObject: Partial<T>
) => {
	for (const key in updatedObject) {
		if (
			typeof previousObject[key] === 'object' &&
			typeof updatedObject[key] === 'object'
		) {
			deleteFilesInObject(
				previousObject[key],
				updatedObject[key] as Partial<T[Extract<keyof T, string>]>
			);
		}
		if (
			previousObject.hasOwnProperty(key) &&
			previousObject[key] &&
			typeof previousObject[key] === 'string'
		) {
			const updatedFileName = updatedObject[key];
			const previousFileName = previousObject[key];

			if (updatedFileName !== previousFileName) {
				deleteFile(previousFileName);
			}
		}
	}
};
