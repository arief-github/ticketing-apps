"use server"

import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"
import { redirect } from "next/navigation"

export const deleteTicket = async (id: string) => {
    await prisma.ticket.delete({
        where: {
            id,
        }
    })

    redirect(ticketsPath())
}