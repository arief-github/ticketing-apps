"use server"

import { revalidatePath } from "next/cache"

import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { prisma } from "@/lib/prisma"
import { organizationPath } from "@/paths"
import { fromErrorToActionState,toActionState } from "@/utils/to-action-state" 

import { getOrganizationByUser } from "../queries/get-organization-by-user"

export const switchOrganization = async (organizationId: string) => {
    const { user } = await getAuthOrRedirect({
        checkActiveOrganization: false
    })
    
    try {
        const organizations = await getOrganizationByUser()

        const canSwitch = organizations.some((organization) => organization.id === organizationId)

        if(!canSwitch) {
            return toActionState("ERROR", "Not a member of this organization")
        }

        await prisma.$transaction([
            prisma.membership.updateMany({
                where: {
                    userId: user.id,
                    organizationId: {
                        not: organizationId
                    }
                },
                data: {
                    isActive: false
                }
            }),
            prisma.membership.update({
                where: {
                    membershipId: {
                        userId: user.id,
                        organizationId
                    }
                },
                data: {
                    isActive: true
                }
            })
        ])
    } catch(error) {
        return fromErrorToActionState(error)
    }

    revalidatePath(organizationPath())

    return toActionState("SUCCESS", "Active organization has been switched")
}
