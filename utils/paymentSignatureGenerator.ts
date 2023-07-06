import crypto from 'crypto';
const { FONDY_PASSWORD, FONDY_MERCHANT_ID } = process.env;

export const paymentSignatureGenerator = (
	obj: { [key: string]: string },
	merchant_id = FONDY_MERCHANT_ID || '',
	password = FONDY_PASSWORD || ''
) => {
	const body: { [key: string]: string } = {
		...obj,
		merchant_id,
	};
	const sortedValues = Object.keys(body)
		.sort((a, b) => a.localeCompare(b))
		.map((key) => body[key])
		.join('|');

	return crypto
		.createHash('sha1')
		.update(`${password}|${sortedValues}`)
		.digest('hex');
};
