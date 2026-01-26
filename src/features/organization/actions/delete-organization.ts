"use server"

import { revalidatePath } from "next/cache"

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { prisma } from "@/lib/prisma"
import { organizationPath } from "@/paths"
import { fromErrorToActionState, toActionState } from "@/utils/to-action-state"

import { getOrganizationByUser } from "../queries/get-organization-by-user"

export const deleteOrganization = async (organizationId: string) => {
    await getAuthOrRedirect()

    try {
        const organizations = await getOrganizationByUser()

        const canDelete = organizations.some((organization) => organization.id === organizationId)

        if(!canDelete) {
            return toActionState("ERROR", "Not a member of this organization")
        }

        await prisma.organization.delete({
            where: {
                id: organizationId
            }
        })
    } catch(error) {
        return fromErrorToActionState(error)
    }

    revalidatePath(organizationPath())

    return toActionState("SUCCESS", "Organization has been deleted")
}