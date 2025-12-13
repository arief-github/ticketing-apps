"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from 'zod';

import { setCookieByKey } from "@/app/actions";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma"
import { ticketPath, ticketsPath } from "@/paths"
import { toCent } from "@/utils/currency";
import { fromErrorToActionState, toActionState } from "@/utils/to-action-state"

const upsertTicketSchema = z.object({
    title: z.string().min(1).max(191),
    content: z.string().min(1).max(1024),
    bounty: z.coerce.number().positive(),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required")
})

export const upsertTicket = async (ticketId: string | undefined, _actionState: { message: string, payload?: FormData }, formData: FormData) => {
    // Get authenticated user for creating new tickets
    const { user } = await getAuthOrRedirect();

    try {
        if(ticketId) {
            const ticket = await prisma.ticket.findUnique({
                where: {
                    id: ticketId
                }
            })

            if(!ticket || !isOwner({ user, entity: ticket })) {
                return toActionState("ERROR", "You are not authorized to update this ticket")
            }
        }
   
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
            update: dbData,
            create: {
                ...dbData,
                userId: user?.id || ""
            }
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