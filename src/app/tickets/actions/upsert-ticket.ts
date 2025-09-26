"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/lib/prisma"
import { ticketPath,ticketsPath } from "@/paths"

export const upsertTicket = async (ticketId: string | undefined, formData: FormData) => {
    const data = {
        title: formData.get("title") as string,
        content: formData.get("content") as string
    }

    await prisma.ticket.upsert({
        where: {
            id: ticketId || "",
        },
        update: data,
        create: data
    })

    revalidatePath(ticketsPath())

    if (ticketId) {
        redirect(ticketPath(ticketId))
    }
}