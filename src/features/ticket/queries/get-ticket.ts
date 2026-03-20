import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

import { getTicketPermission } from "./get-ticket-permission";

export const getTicket = async (ticketId: string) => {
  const { user } = await getAuth();

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  const isTicketOwner = isOwner({ user, entity: ticket });

  if (!ticket) {
    return null;
  }

  const permissions = await getTicketPermission({
    userId: user?.id,
    organizationId: ticket?.organizationId,
  });

  return {
    ...ticket,
    isOwner: isTicketOwner,
    permissions: {
      canDeleteTicket:
        isOwner({ user, entity: ticket }) && !!permissions?.canDeleteTicket,
    },
  };
};
