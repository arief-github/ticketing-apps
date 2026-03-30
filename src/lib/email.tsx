import { Resend } from "resend";

import EmailInvitation from "@/components/shared/EmailInvitation";
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

type EmailInvitationProps = Pick<
  EmailVerificationProps,
  "email" | "username"
> & {
  organizationName: string;
  emailInvitationLink: string;
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

async function sendEmailInvitation({
  username,
  organizationName,
  email,
  emailInvitationLink,
}: EmailInvitationProps) {
  return await resend.emails.send({
    from: "Email Invitation <onboarding@resend.dev>",
    to: email,
    subject: `Invitation to ${organizationName} from Ticketing App`,
    react: (
      <EmailInvitation
        fromUser={username}
        fromOrganization={organizationName}
        url={emailInvitationLink}
      />
    ),
  });
}

export { sendEmail, sendEmailInvitation, sendEmailVerification };
