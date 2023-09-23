import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

type TPayload = {
	name: string;
	link?: string;
};

export const sendEmail = async (
	email: string,
	subject: string,
	payload: TPayload,
	template: string
) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const source = fs.readFileSync(path.join(__dirname, template), 'utf8');
		const compiledTemplate = handlebars.compile(source);
		const options = () => {
			return {
				from: process.env.FROM_EMAIL,
				to: email,
				subject: subject,
				html: compiledTemplate(payload),
			};
		};

		transporter.sendMail(options(), (error, _info) => {
			if (error) {
				return error;
			} else {
				return {
					success: true,
				};
			}
		});
	} catch (error) {
		return error;
	}
};
