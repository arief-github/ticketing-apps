"use server"

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { prisma } from '@/lib/prisma'
import { ticketPath } from '@/paths'
import { ActionState, fromErrorToActionState, toActionState } from "@/utils/to-action-state"

const createCommentSchema = z.object({
    content: z.string().min(1).max(1024)
})

export const createComment = async (ticketId: string, _actionState: ActionState, formData: FormData) => {
    const { user } = await getAuthOrRedirect()

    let comment;

    try {
        const data = createCommentSchema.parse(Object.fromEntries(formData))
    
        comment = await prisma.comment.create({
            data: {
                userId: user.id,
                ticketId,
                ...data
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })
    } catch (error) {
        return fromErrorToActionState(error)
    }

    revalidatePath(ticketPath(ticketId))

    return toActionState("SUCCESS", "Comment created", undefined, {
        ...comment,
        isOwner: true
    })
}