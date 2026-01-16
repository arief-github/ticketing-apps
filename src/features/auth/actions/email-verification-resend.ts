"use server"

import { sendEmailVerification } from "@/lib/email"
import { canResendVerificationEmail } from "@/utils/can-resend-verification-email"
import { fromErrorToActionState, toActionState } from "@/utils/to-action-state"

import { getAuthOrRedirect } from "../queries/get-auth-or-redirect"
import { generateEmailVerificationToken } from "../utils/generate-email-verification-code"

export const emailVerificationResend = async () => {
    const { user } = await getAuthOrRedirect({
        checkEmailVerified: false,
        checkOrganization: false,
    })

    try {
        const canResend = await canResendVerificationEmail(user.id)

        if(!canResend) {
            return toActionState("ERROR", "You can only resend verification email once every minutes")
        }

        const verificationCode = await generateEmailVerificationToken(
            user.id,
            user.email
        )

        const result = await sendEmailVerification({
            username: user.username,
            email: user.email,
            verificationCode
        })

        if(result.error) {
            return toActionState("ERROR", "Failed to send verification email")
        }
    } catch(error) {
        return fromErrorToActionState(error)
    }

    return toActionState("SUCCESS", "Verification email has been sent")
}