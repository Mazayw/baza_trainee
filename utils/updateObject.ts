export const mergeObjects = <T extends Record<string, any>>(
	existingObj: T,
	updatesObj: Partial<T>
): T => {
	const mergedObj = { ...existingObj };

	for (const key in updatesObj) {
		if (
			typeof existingObj[key] === 'object' &&
			typeof updatesObj[key] === 'object'
		) {
			mergedObj[key] = mergeObjects(
				existingObj[key] as T[Extract<keyof T, string>],
				updatesObj[key] as Partial<T[Extract<keyof T, string>]>
			);
		} else {
			mergedObj[key] = updatesObj[key]!;
		}
	}

	return mergedObj;
};
