import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";

type getMembershipProps = {
    organizationId: string;
    userId: string;
}

export const getMembership = async ({ organizationId, userId }: getMembershipProps) => {
    await getAuthOrRedirect()

    const membership = await prisma.membership.findUnique({
        where: {
            membershipId: {
                organizationId,
                userId
            }
        }
    })

    return membership;
}