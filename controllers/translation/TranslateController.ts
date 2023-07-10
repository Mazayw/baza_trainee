import { Request, Response } from 'express';
import { googleTranslateApi, translate } from 'google-translate-api-x';
import { languages } from './languages';
import { SETTINGS } from '../../settings';

async function retryRequest(
	requestFn: () => Promise<googleTranslateApi.TranslationResponse>,
	maxRetries = 4
) {
	let retries = 0;
	while (retries < maxRetries) {
		try {
			const result = await requestFn();
			return result;
		} catch (error) {
			console.error('Request Error:', error);
			retries++;
		}
	}
	throw new Error('Request failed after multiple retries');
}

export const getTranslation = async (req: Request, res: Response) => {
	const lang = req.params.lang || '';
	const translationText = req.body.input;

	try {
		if (!(lang in languages) || !translationText) {
			return res.status(406).json({
				message: 'Wrong translation language or there is no text to translate',
			});
		}

		if (translationText.length > SETTINGS.textToTranslateTextMaxLength) {
			return res.status(406).json({
				message: `The text to be translated should be no longer than ${SETTINGS.textToTranslateTextMaxLength} characters`,
			});
		}

		const translationRequest = async () => {
			return await translate(translationText, {
				to: lang,
				autoCorrect: true,
			});
		};

		const result = await retryRequest(
			translationRequest as () => Promise<googleTranslateApi.TranslationResponse>,
			3
		);
		let translatedText;
		if ('text' in result) {
			translatedText = result.text;
		} else {
			throw new Error('Invalid translation response');
		}

		res.json({ input: translationText, translated: translatedText });
	} catch (error) {
		console.error('Translation Error:', error);
		res.status(500).json({ message: `Can't perform translation`, error });
	}
};
