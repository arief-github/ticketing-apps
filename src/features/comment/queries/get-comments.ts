"use server"

import { getAuth } from "@/features/auth/actions/get-auth"
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma"

export const getComments = async (ticketId: string, offset?: number) => {
    const { user } = await getAuth();

    const skip = offset ?? 0;
    const take = 2;

    const where = { ticketId }

    const commentsFindMany = prisma.comment.findMany({
        where,
        skip,
        take,
        include: {
            user: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const countComment = prisma.comment.count({
        where
    })

    const [comments, count] = await prisma.$transaction([commentsFindMany, countComment])

    const metadata = {
        count,
        hasNextPage: count > skip + take,
    }

    return {
        list: comments.map(comment => ({
            ...comment,
            isOwner: isOwner({ user, entity: comment })
        })),
        metadata
    }
}