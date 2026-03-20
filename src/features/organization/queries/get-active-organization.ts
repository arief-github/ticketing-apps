import { getAuth } from "@/features/auth/actions/get-auth";
import { prisma } from "@/lib/prisma";

export const getActiveOrganization = async () => {
  // take "user" object from getAuth()
  const { user } = await getAuth();

  // checking user is available is available or not
  if (!user) {
    return null;
  }

  const activeOrganization = await prisma.organization.findFirst({
    where: {
      memberships: {
        some: {
          userId: user.id,
          isActive: true,
        },
      },
    },
  });

  return activeOrganization;
};
