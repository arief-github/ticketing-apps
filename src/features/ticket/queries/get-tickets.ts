import { prisma } from "@/lib/prisma"

import { ParsedSearchParams } from "../constants"
import buildOrderBy from "./helpers/build-order-by"

export const getTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
    const where = {
            userId,
            ...(typeof searchParams.search === "string" && {
                   title: {
                    contains: searchParams.search,
                    mode: "insensitive" as const
                }
            })
        }
    
    const skip = searchParams.page * searchParams.size
    const take = searchParams.size

    const [tickets, count] = await prisma.$transaction([
        prisma.ticket.findMany({
            skip,
            take,
            where, 
            orderBy: buildOrderBy(searchParams.sort),
            include: {
                user: {
                    select: {
                        username: true
                    }
            }
        }
    }),
    prisma.ticket.count({
        where
    })
    ])

    const metadata = {
        count,
        hasNextPage: count > skip + take,
        hasPreviousPage: skip > 0
    }

    return {
        list: tickets,
        metadata
    }
}