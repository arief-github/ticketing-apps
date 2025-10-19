"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from 'zod';
import { setCookieByKey } from "@/app/actions";

import { prisma } from "@/lib/prisma"
import { ticketPath, ticketsPath } from "@/paths"
import { fromErrorToActionState, toActionState } from "@/utils/to-action-state"
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024),
    bounty: z.coerce.number().positive(),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required")
})

export const upsertTicket = async (ticketId: string | undefined, _actionState: { message: string, payload?: FormData }, formData: FormData) => {
    try {
        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
            bounty: formData.get("bounty"),
            deadline: formData.get("deadline")
        })

        // copy previous data with bounty converted value
        const dbData = {
            ...data,
            bounty: toCent(data.bounty)
        }

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