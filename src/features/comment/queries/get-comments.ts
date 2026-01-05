"use server"

import { getAuth } from "@/features/auth/actions/get-auth"
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma"

export const getComments = async (ticketId: string, cursor?: string) => {
    const { user } = await getAuth();

    const limit = 2;
    const take = limit + 1;

    let where: Record<string, unknown> = { ticketId };

    if (cursor) {
        // Parse cursor to get createdAt and id
        const [createdAtStr, id] = cursor.split('|');
        const cursorCreatedAt = new Date(createdAtStr);

        where = {
            ticketId,
            OR: [
                { createdAt: { lt: cursorCreatedAt } },
                {
                    AND: [
                        { createdAt: { equals: cursorCreatedAt } },
                        { id: { lt: id } }
                    ]
                }
            ]
        };
    }

    const commentsFindMany = prisma.comment.findMany({
        where,
        take,
        include: {
            user: {
                select: {
                    username: true
                }
            }
        },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }]
    })

    const countComment = prisma.comment.count({
        where: { ticketId }
    })

    const [comments, count] = await prisma.$transaction([commentsFindMany, countComment])

    const lastComment = comments[limit - 1];
    const metadata = {
        count,
        hasNextPage: comments.length > limit,
        cursor: lastComment
            ? `${lastComment.createdAt.toISOString()}|${lastComment.id}`
            : undefined
    }

    return {
        list: comments.slice(0, limit).map(comment => ({
            ...comment,
            isOwner: isOwner({ user, entity: comment })
        })),
        metadata
    }
}