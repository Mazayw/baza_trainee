export const getFileKeyFromUrl = (url: string): string | null => {
	try {
		const urlObject = new URL(url);
		const fileKey = urlObject.pathname.substring(1);
		return fileKey;
	} catch (error) {
		console.log('Error parsing URL:', error);
		return null;
	}
};
