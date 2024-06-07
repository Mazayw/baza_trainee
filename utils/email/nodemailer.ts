import { createTransport } from 'nodemailer';

const { env } = process;

const transport = createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE === 'false' ? false : true,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  ignoreTLS: true,
});

export const sendMail = async (text: string, subject: string, to: string) => {
  const res = await transport.sendMail({
    from: env.SMTP_FROM,
    to: to,
    text: text,
    subject: subject,
  });
  console.log(res);
};
