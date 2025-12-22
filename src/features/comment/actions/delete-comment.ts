"use server"

import { revalidatePath } from "next/cache";

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";
import { fromErrorToActionState, toActionState } from "@/utils/to-action-state";

export const deleteComment = async (id: string) => {
    const { user } = await getAuthOrRedirect();

    const comment = await prisma.comment.findUnique({
        where: { id }
    })

    if(!comment || !isOwner({ user, entity: comment })) {
        return toActionState("ERROR", "You are not authorized to delete this comment")
    }

    try {
        await prisma.comment.delete({
            where: { id }
        })
    } catch(error) {
        return fromErrorToActionState(error)
    }

    revalidatePath(ticketPath(comment.ticketId))

    return toActionState("SUCCESS", "Comment Deleted")
}