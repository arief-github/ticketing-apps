import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getActiveOrganization } from "@/features/organization/queries/get-active-organization";
import { prisma } from "@/lib/prisma";

import { ParsedSearchParams } from "../constants";
import { getTicketPermission } from "./get-ticket-permission";
import buildOrderBy from "./helpers/build-order-by";

export const getTickets = async (
  userId: string | undefined,
  byOrganization: boolean,
  searchParams: ParsedSearchParams,
) => {
  const { user } = await getAuth();
  const activeOrganization = await getActiveOrganization();
  const where = {
    ...(byOrganization && activeOrganization
      ? {
          organizationId: activeOrganization.id,
        }
      : {
          userId,
        }),
    ...(typeof searchParams.search === "string" && {
      title: {
        contains: searchParams.search,
        mode: "insensitive" as const,
      },
    }),
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const tickets = await prisma.ticket.findMany({
    skip,
    take,
    where,
    orderBy: buildOrderBy(searchParams.sort),
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  const count = await prisma.ticket.count({
    where,
  });

  const metadata = {
    count,
    hasNextPage: count > skip + take,
    hasPreviousPage: skip > 0,
  };

  const permission = await getTicketPermission({
    organizationId: activeOrganization?.id,
    userId,
  });

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner({ user, entity: ticket }),
      permissions: {
        canDeleteTicket:
          isOwner({ user, entity: ticket }) && permission?.canDeleteTicket,
      },
    })),
    metadata,
  };
};
