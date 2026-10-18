import nodemailer from "nodemailer";
import { getSettings } from "./settings";

export async function sendRequestMail(subject: string, html: string) {
  const s = await getSettings();
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({ from: process.env.SMTP_FROM, to: s.requestsEmail, subject, html });
}