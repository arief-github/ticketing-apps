import { prisma } from "@/lib/prisma"

import { SearchParams } from "../constants"
import buildOrderBy from "./helpers/build-order-by"

export const getTickets = async (userId: string | undefined, searchParams: SearchParams) => {
    return await prisma.ticket.findMany({
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