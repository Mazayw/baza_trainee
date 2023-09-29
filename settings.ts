export const SETTINGS = {
	version: '290923',
	fileSizeLimits: {
		// The maximum file size in bytes (e.g., 1 * 1024 * 1024 = 1MB)
		partnerLogo: 500 * 1024,
		projectCard: 1 * 1024 * 1024,
		report: 500 * 1024,
		testimonialPhoto: 500 * 1024,
		heroSliderPhoto: 1 * 1024 * 1024,
	},
	allowCreateDocumentWithoutFile: false, //If true, the document can be created with the URL.
	allowUserRegistration: true,
	maxNumberOfItems: {
		heroSlider: 5,
		testimonialsSlider: 23,
	},
	fileUploadMethod: 'disk', //disk or s3 storage
	fileUploadFolderName: 'baza-static',
	textToTranslateTextMaxLength: 700,
	tokenExpiration: '30d',
};
