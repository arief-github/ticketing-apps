import { sendEmailVerification } from "@/lib/email";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

import { generateEmailVerificationToken } from "../utils/generate-email-verification-code";

export type EmailVerificationEventArgs = {
    data : {
        userId: string
    }
}

export const emailVerificationEvent = inngest.createFunction(
    { id: "email-verification" },
    { event: "app/auth.sign-up" },
    async ({ event }) => {
        const { userId } = event.data

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId
            }
        })

        const verificationCode = await generateEmailVerificationToken(user.id, user.email)

        const result = await sendEmailVerification({
            username: user.username,
            email: user.email,
            verificationCode
        })

        return { event, body: result };
    }
)