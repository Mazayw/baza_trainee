import { Request, Response } from 'express';
import { paymentSignatureGenerator } from '../utils/paymentSignatureGenerator.js';
import axios from 'axios';

const { PAYMENT_MERCHANT_ID } = process.env;

const merchantAccount = PAYMENT_MERCHANT_ID || '';

export const makePayment = async (req: Request, res: Response) => {
	try {
		console.log(req.body);
		const merchantSignature = paymentSignatureGenerator(req.body);
		const url = `https://api.wayforpay.com/api`;
		const body = {
			...req.body,
			merchantAccount,
			merchantSignature,
		};

		const response = (await axios.post(url, body)).data;
		console.log(response);

		if (response.reasonCode) {
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
		res.redirect('/?payment=success');
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Can't make redirect`, error });
	}
};
