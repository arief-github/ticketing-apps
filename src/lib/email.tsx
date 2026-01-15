import { Resend } from "resend";

import EmailPasswordResetLink from "@/components/shared/EmailPasswordResetLink";
import EmailVerification from "@/components/shared/EmailVerificationLink";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailProps = {
  to: string;
  subject: string;
  url: string;
};

type EmailVerificationProps = {
  username: string;
  email: string;
  verificationCode: string;
};

async function sendEmail({ to, subject, url }: SendEmailProps) {
  await resend.emails.send({
    from: "Arief <onboarding@resend.dev>",
    to,
    subject,
    react: <EmailPasswordResetLink toName={to} url={url} />,
  });
}

async function sendEmailVerification({
  username,
  email,
  verificationCode,
}: EmailVerificationProps) {
  return await resend.emails.send({
    from: "Email Verification <onboarding@resend.dev>",
    to: email,
    subject: "Email Verification from Ticketing App",
    react: <EmailVerification toName={username} code={verificationCode} />,
  });
}

export { sendEmail, sendEmailVerification };
