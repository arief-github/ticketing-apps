"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { ticketsPath } from "@/paths"

export const createTicket = async (formData: FormData) => {
    // gathering data from component form
    const data = {
        title: formData.get("title"),
        content: formData.get("content")
    }

    // send the data to prisma
    await prisma.ticket.create({
        data: {
            title: data.title as string,
            content: data.content as string
        }
    })

    // on demand cache after creation success, update the list of data
    revalidatePath(ticketsPath())
}