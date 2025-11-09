import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type SendEmailProps = {
    to: string;
    subject: string;
    text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailProps) {
    await resend.emails.send({
        from: 'Arief <onboarding@resend.dev>',
        to,
        subject,
        text
    })

    console.log({ to, subject, text })
}