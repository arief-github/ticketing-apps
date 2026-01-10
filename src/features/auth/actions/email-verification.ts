"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

import { setCookieByKey } from "@/app/actions"
import { lucia } from "@/lib/lucia"
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { ActionState, fromErrorToActionState, toActionState } from "@/utils/to-action-state"

import { getAuthOrRedirect } from "../queries/get-auth-or-redirect"
import { validateEmailVerificationCode } from "../utils/validate-email-verification-code"

const emailVerificationSchema = z.object({
    code: z.string().length(8)
})

export const emailVerification = async (_actionState: ActionState, formData: FormData) => {
    const { user } = await getAuthOrRedirect({
        checkEmailVerified: false
    })
   
    try {
        const { code } = emailVerificationSchema.parse({
            code: formData.get("code")
        })

        const validCode = await validateEmailVerificationCode(user.id, user.email, code)

        if(!validCode) {
            return toActionState("ERROR", "Invalid code")
        }
 
        await prisma.session.deleteMany({
            where: {
                userId: user.id
            }
        })

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                emailVerified: true
            }
        })

        const session = await lucia.createSession(user.id, {})
        const sessionCookie = lucia.createSessionCookie(session.id)

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )
    } catch (error) {
        return fromErrorToActionState(error)
    }

    await setCookieByKey("toast", "Email verified");
    redirect(ticketsPath());
}