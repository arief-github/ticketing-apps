import { sendEmail } from '@/lib/email'
import { inngest } from '@/lib/inngest'

export type PasswordResetEventArgs = {
    data : {
        email: string
        token: string
    }
}

export const passwordResetEvent = inngest.createFunction(
    { 
        id: 'password-reset',
        retries: 3,
        onFailure: async ({ event, error }) => {
            console.error(`Failed to send password reset email to ${event.data.event.data.email} after retries. Error: ${error.message}`);
        }
    },
    { event: 'app/auth.password-reset-request' },
    async ({ event }) => {
        const { email, token } = event.data

        const environment = process.env.NODE_ENV

        const appUrl = environment === "development" ? process.env.APP_URL : process.env.VERCEL_APP_URL 
        
        const resetUrl = `${appUrl}/password-reset/${token}`
        
        const result = await sendEmail({
            to: email,
            subject: "Password Reset Request",
            url: resetUrl 
        })

        return { event, body: result }
    }
)