"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from 'zod';
import { setCookieByKey } from "@/app/actions";

import { prisma } from "@/lib/prisma"
import { ticketPath, ticketsPath } from "@/paths"
import { fromErrorToActionState, toActionState } from "@/utils/to-action-state"

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024)
})

export const upsertTicket = async (ticketId: string | undefined, _actionState: { message: string, payload?: FormData }, formData: FormData) => {
    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content")
        })

        await prisma.ticket.upsert({
            where: {
                id: ticketId || "",
            },
            update: data,
            create: data
        })
    } catch (error) {
        return fromErrorToActionState(error, formData)
    }

    revalidatePath(ticketsPath())

    if (ticketId) {
        setCookieByKey("toast", "Ticket Updated!")
        redirect(ticketPath(ticketId))
    }

    return toActionState("SUCCESS", "Ticket Created Successfully")
}