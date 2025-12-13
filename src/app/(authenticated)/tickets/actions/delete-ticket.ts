"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { setCookieByKey } from "@/app/actions"
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { isOwner } from "@/features/auth/utils/is-owner"
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { fromErrorToActionState, toActionState } from "@/utils/to-action-state"

export const deleteTicket = async (id: string) => {
    const { user } = await getAuthOrRedirect()
    
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id,
            }
        })

        if(!ticket || !isOwner({ user, entity: ticket })) {
            return toActionState("ERROR", "You are not authorized to delete this ticket")
        }

        await prisma.ticket.delete({
            where: {
                id,
            }
        })
    } catch(error) {
        fromErrorToActionState(error)
    }

    revalidatePath(ticketsPath())
    setCookieByKey("toast", "Ticket Deleted!")
    redirect(ticketsPath())
}