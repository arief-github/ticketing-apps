"use server"

import { revalidatePath } from "next/cache"

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { prisma } from "@/lib/prisma"
import { membershipsPath } from "@/paths"
import { toActionState } from "@/utils/to-action-state"

import { getMemberships } from "../queries/get-memberships"

type deleteMembershipsProps = {
    userId: string;
    organizationId: string;
}

export const deleteMemberships = async ({ userId, organizationId }: deleteMembershipsProps) => {
    await getAuthOrRedirect()

    const memberships = await getMemberships(organizationId)

    const isLastMembership = (memberships ?? []).length === 1;

    if(isLastMembership) {
        return toActionState("ERROR", "You cannot delete the last membership of an organization")
    }

    await prisma.membership.delete({
        where: {
            membershipId: {
                userId,
                organizationId
            }
        }
    })

    revalidatePath(membershipsPath(organizationId))

    return toActionState("SUCCESS", "Membership deleted successfully")
}