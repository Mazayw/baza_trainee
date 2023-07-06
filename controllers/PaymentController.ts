import { Request, Response } from 'express';
import { paymentSignatureGenerator } from '../utils/paymentSignatureGenerator.js';
import fetch from 'node-fetch';

const { FONDY_MERCHANT_ID } = process.env;

const merchant_id = FONDY_MERCHANT_ID || '';

export const makePayment = async (req: Request, res: Response) => {
	try {
		const signature = paymentSignatureGenerator(req.body);
		const url = `https://pay.fondy.eu/api/checkout/url/`;
		const headers = {
			'Content-Type': 'application/json',
		};
		const body = {
			request: {
				...req.body,
				merchant_id,
				signature,
			},
		};
		console.log(body);
		const response = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		});
		const responseData = await response.json();
		if (responseData.response.checkout_url) {
			res.status(200).json(responseData);
		} else {
			res
				.status(responseData.response.response_status)
				.send('Request failed with error ' + responseData.error_message);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't get payment url`, error });
	}
};
