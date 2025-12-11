import { prisma } from "@/lib/prisma"

import { SearchParams } from "../constants"

// simulation of fetching API, i'm inserting setTimeout
export const getTickets = async (userId: string | undefined, searchParams: SearchParams) => {
    return await prisma.ticket.findMany({
        where: {
            userId,
            title: {
                contains: searchParams.search,
                mode: "insensitive"
            }
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