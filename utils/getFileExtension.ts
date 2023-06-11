export function getFileExtension(filename: string): string {
	const dotIndex = filename.lastIndexOf('.');
	if (dotIndex !== -1 && dotIndex < filename.length - 1) {
		return filename.substring(dotIndex + 1);
	}
	return '';
}
