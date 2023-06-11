export const mergeObjects = <T extends Record<string, any>>(
	existingObj: T,
	updatesObj: Partial<T>
): T => {
	for (const key in updatesObj) {
		if (
			typeof existingObj[key] === 'object' &&
			typeof updatesObj[key] === 'object'
		) {
			existingObj[key] = mergeObjects(
				existingObj[key] as T[Extract<keyof T, string>],
				updatesObj[key] as Partial<T[Extract<keyof T, string>]>
			);
		} else {
			existingObj[key] = updatesObj[key]!;
		}
	}
	return existingObj;
};
