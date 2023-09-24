import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import {
	requestResetPasswordTemplate,
	resetPasswordTemplate,
} from './templates';

type TPayload = {
	name: string;
	link?: string;
};

export const sendEmail = async (
	email: string,
	subject: string,
	payload: TPayload,
	template: 'reset' | 'request'
) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
		const source =
			template === 'request'
				? requestResetPasswordTemplate
				: resetPasswordTemplate;

		const compiledTemplate = handlebars.compile(source);
		const options = () => {
			return {
				from: process.env.FROM_EMAIL,
				to: email,
				subject: subject,
				html: compiledTemplate(payload),
			};
		};
		console.log(compiledTemplate);
		transporter.sendMail(options(), (error, _info) => {
			if (error) {
				console.log('error');
				return error;
			} else {
				console.log('transporter');
				return {
					success: true,
				};
			}
		});
	} catch (error) {
		return error;
	}
};
