"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { setCookieByKey } from "@/app/actions"
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { fromErrorToActionState } from "@/utils/to-action-state"

export const deleteTicket = async (id: string) => {
    try {
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