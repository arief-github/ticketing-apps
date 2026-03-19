import { prisma } from "@/lib/prisma";

type GetTicketPermission = {
  organizationId: string | undefined;
  userId: string | undefined;
};

export const getTicketPermission = async ({
  organizationId,
  userId,
}: GetTicketPermission) => {
  if (!organizationId || !userId) {
    return {
      canDeleteTicket: false,
    };
  }

  const membership = await prisma.membership.findUnique({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  return {
    canDeleteTicket: membership?.canDeleteTicket,
  };
};
