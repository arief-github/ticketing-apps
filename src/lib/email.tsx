import { Resend } from "resend";

import EmailPasswordResetLink from "@/components/shared/EmailPasswordResetLink";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailProps = {
  to: string;
  subject: string;
  url: string;
};

export async function sendEmail({ to, subject, url }: SendEmailProps) {
  await resend.emails.send({
    from: "Arief <onboarding@resend.dev>",
    to,
    subject,
    react: <EmailPasswordResetLink toName={to} url={url} />,
  });
}
