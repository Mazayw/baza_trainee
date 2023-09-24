import handlebars from 'handlebars';
import {
	requestResetPasswordTemplate,
	resetPasswordTemplate,
} from './templates';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

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
		const source =
			template === 'request'
				? requestResetPasswordTemplate
				: resetPasswordTemplate;

		const compiledTemplate = handlebars.compile(source);

		const msg = {
			to: email,
			from: process.env.FROM_EMAIL || '',
			subject: subject,
			html: compiledTemplate(payload),
		};

		sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent');
			})
			.catch((error) => {
				console.error(error);
			});

		return {
			success: true,
		};
	} catch (error) {
		return error;
	}
};
