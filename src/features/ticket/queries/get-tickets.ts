import { prisma } from "@/lib/prisma"

// simulation of fetching API, i'm inserting setTimeout
export const getTickets = async (userId: string | undefined) => {
    return await prisma.ticket.findMany({
        where: {
            userId
        },
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