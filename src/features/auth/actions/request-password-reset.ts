"use server"

import { randomBytes } from "crypto"
import { z } from 'zod'

import { sendEmail } from "@/lib/email"
import { prisma } from "@/lib/prisma"
import { ActionState, fromErrorToActionState,toActionState } from "@/utils/to-action-state"

const schema = z.object({
    email: z.string().email('Invalid Email Address')
})

export async function requestPasswordReset(_actionState: ActionState, formData: FormData) {
    try {
        const { email } = schema.parse(Object.fromEntries(formData))

        const user = await prisma.user.findUnique({ where: { email } })

        if(!user) {
            return toActionState("SUCCESS", "if that account exists, check your email")
        }

        const token = randomBytes(32).toString("hex")
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60) //* 1 hour

        await prisma.passwordResetToken.create({
            data: { token, userId: user.id, expiresAt }
        })

        const resetUrl = `${process.env.APP_URL}/password-reset/${token}`

        await sendEmail({
            to: email,
            subject: "Password Reset Request",
            text: `Reset your password here ${resetUrl}` 
        })

        return toActionState("SUCCESS", "If that account exists, check your email")

    } catch(error) {
        return fromErrorToActionState(error, formData)
    }
}