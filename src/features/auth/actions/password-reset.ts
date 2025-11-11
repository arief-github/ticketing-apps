"use server"

import { hash } from "@node-rs/argon2";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ActionState, fromErrorToActionState, toActionState } from "@/utils/to-action-state";

const schema = z.object({
    token: z.string(),
    password: z.string().min(6, "Password Too Short")
})

export async function resetPassword(_actionState: ActionState, formData: FormData) {
    try {
        const { token, password } = schema.parse(Object.fromEntries(formData))

        const reset = await prisma.passwordResetToken.findUnique({ where: { token } })

        if(!reset || reset.expiresAt < new Date()) {
            return toActionState("ERROR", "Invalid or Expired token")
        }

        const passwordHash = await hash(password)

         await prisma.$transaction([
            prisma.user.update({
                where: { id: reset.userId },
                data: { passwordHash }
            }),
            prisma.passwordResetToken.delete({ where: { id: reset.id }})
        ])

        return toActionState("SUCCESS", "Password successfully reset!")
    } catch(error) {
        return fromErrorToActionState(error, formData)
    }
}