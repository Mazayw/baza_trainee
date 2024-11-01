import { Request, Response } from 'express';
import { sendMail } from '../../utils/email/nodemailer';

const mailReciver = String(process.env.SMTP_FROM)

export const sendFeedback = async (req: Request, res: Response) => {
  try {
    const sendEmailDTO = req.body;
    const text = `New message from baza-trainee feedback form
name: ${sendEmailDTO.name}
email: ${sendEmailDTO.email}
text : ${sendEmailDTO.text}
`;
    const subject = `Baza-trainee feedback form`;
    await sendMail(text, subject, mailReciver);
    return res.json({ status: true });
  } catch (error) {
    console.error('Error retrieving contacts data', error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving contacts data' });
  }
};

export const sendMentorForm = async (req: Request, res: Response) => {
  try {
    const sendEmailDTO = req.body;
    const text = `New mentor request from baza-trainee mentor form
firstName: ${sendEmailDTO.firstName}
lastName: ${sendEmailDTO.lastName}
email: ${sendEmailDTO.email}
phone: ${sendEmailDTO.phone}
discord: ${sendEmailDTO.discord}
linkedin: ${sendEmailDTO.linkedin}
specialization: ${sendEmailDTO.specialization}
convenient_time: ${sendEmailDTO.convenient_time}
`;
    const subject = `Baza-trainee mentor form`;
    await sendMail(text, subject, mailReciver);
    return res.json({ status: true });
  } catch (error) {
    console.error('Error retrieving contacts data', error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving contacts data' });
  }
};