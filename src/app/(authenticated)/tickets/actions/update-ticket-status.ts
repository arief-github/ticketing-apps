"use server"

import { TicketStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { isOwner } from "@/features/auth/utils/is-owner"
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { fromErrorToActionState, toActionState } from '@/utils/to-action-state'

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
    const { user } = await getAuthOrRedirect()
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id,
            }
        })

        if (!ticket || !isOwner({ user, entity: ticket })) {
            return toActionState("ERROR", "You are not authorized to update this ticket")
        }

        await prisma.ticket.update({
            where: {
                id,
            },
            data: {
                status
            }
        })
    } catch (error) {
        return fromErrorToActionState(error)
    }

    revalidatePath(ticketsPath())

    return toActionState("SUCCESS", "Status Updated")
}

