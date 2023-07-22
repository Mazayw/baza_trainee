import { Request, Response } from 'express';
import { paymentSignatureGenerator } from '../utils/paymentSignatureGenerator.js';
import axios from 'axios';

const { FONDY_MERCHANT_ID } = process.env;

const merchant_id = FONDY_MERCHANT_ID || '';

export const makePayment = async (req: Request, res: Response) => {
	try {
		const signature = paymentSignatureGenerator(req.body);
		const url = `https://pay.fondy.eu/api/checkout/url/`;
		const body = {
			request: {
				...req.body,
				merchant_id,
				signature,
			},
		};

		const response = (await axios.post(url, body)).data;

		if (response.response?.checkout_url) {
			res.status(200).json(response);
		} else {
			res
				.status(response.response.response_status)
				.send('Request failed with error ' + response.error_message);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't get payment url`, error });
	}
};

export const completePayment = async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		res.redirect('/');
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't make redirect`, error });
	}
};
