import { prisma } from "@/lib/prisma"

export const getTicket = async (ticketId: string) => {
    return await prisma.ticket.findUnique({
        where: {
            id: ticketId
        }
    })
}