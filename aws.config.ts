import AWS from 'aws-sdk';

AWS.config.update({
	accessKeyId: 'YOUR_ACCESS_KEY',
	secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
	region: 'YOUR_REGION',
});

export default AWS;
