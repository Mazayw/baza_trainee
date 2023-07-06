import { Request, Response } from 'express';
import { SETTINGS } from '../settings.js';
import { body } from 'express-validator';
import { paymentSignatureGenerator } from '../utils/paymentSignatureGenerator.js';

const { FONDY_PASSWORD, FONDY_MERCHANT_ID } = process.env;

const merchant_id = FONDY_MERCHANT_ID || '';

const paymentRequest = (merchant_id: string, order_desc: string) => {
	return {
		order_id: Date.now().toString(),
		merchant_id: merchant_id,
		order_desc: '',
		signature: '',
		amount: 0,
		currency: 'UAH',
	};
};

interface IPaymentRequest {
	merchant_id: string;
	amount: string;
	currency: string;
}

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
