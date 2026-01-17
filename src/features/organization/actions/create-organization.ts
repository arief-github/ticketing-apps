"use server"

import { redirect } from "next/navigation"
import { z } from 'zod'

import { setCookieByKey } from "@/app/actions"
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { ActionState, fromErrorToActionState } from "@/utils/to-action-state"

const createOrganizationSchema = z.object({
    name: z.string().min(1).max(191),
})

export const createOrganization = async (_actionState: ActionState, formData: FormData) => {
    const { user } = await getAuthOrRedirect({
        checkOrganization: false
    })

    try {
        const data = createOrganizationSchema.parse({
            name: formData.get("name")
        })

        await prisma.organization.create({
            data: {
                ...data,
                memberships: {
                    create: {
                        userId: user.id,
                        isActive: false
                    }
                }
            }
        })

    } catch(error) {
        return fromErrorToActionState(error)
    }

    await setCookieByKey("toast", "Organization Created")
    redirect(ticketsPath())
}