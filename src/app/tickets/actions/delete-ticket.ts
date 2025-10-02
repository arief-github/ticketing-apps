"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { setCookieByKey } from "@/app/actions"

export const deleteTicket = async (id: string) => {
    await prisma.ticket.delete({
        where: {
            id,
        }
    })

    revalidatePath(ticketsPath())
    setCookieByKey("toast", "Ticket Deleted!")
    redirect(ticketsPath())
}