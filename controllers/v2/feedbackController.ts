import { Request, Response } from 'express';
import { sendMail } from '../../utils/email/nodemailer';

export const sendFeedback = async (req: Request, res: Response) => {
  try {
    const sendEmailDTO = req.body;
    const text = `New message from baza-trainee feedback form
name : ${sendEmailDTO.name}
email: ${sendEmailDTO.email}
text : ${sendEmailDTO.text}
`;
    const subject = `Baza-trainee feedback form`;
    await sendMail(text, subject, sendEmailDTO.to);
    return res.json({ status: true });
  } catch (error) {
    console.error('Error retrieving contacts data', error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving contacts data' });
  }
};
