import { prisma } from "@/lib/prisma"

import { ParsedSearchParams } from "../constants"
import buildOrderBy from "./helpers/build-order-by"

export const getTickets = async (userId: string | undefined, searchParams: ParsedSearchParams) => {
    const skip = searchParams.page * searchParams.size
    const take = searchParams.size

    return await prisma.ticket.findMany({
        skip,
        take,
        where: {
            userId,
            ...(typeof searchParams.search === "string" && {
                   title: {
                    contains: searchParams.search,
                    mode: "insensitive"
                }
            })
        },
        orderBy: buildOrderBy(searchParams.sort),
        include: {
            user: {
                select: {
                    username: true
                }
            }
        }
    })
}