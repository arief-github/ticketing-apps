import { prisma } from "@/lib/prisma"

// simulation of fetching API, i'm inserting setTimeout
export const getTickets = async () => {
    return await prisma.ticket.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: {
                select: {
                    username: true
                }
            }
        }
    })
}