"use server";

import { MembershipRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/paths";
import { toActionState } from "@/utils/to-action-state";

import { getAdminOrRedirect } from "../queries/get-admin-or-redirect";
import { getMemberships } from "../queries/get-memberships";

export const updateMembershipRole = async ({
  userId,
  organizationId,
  membershipRole,
}: {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
}) => {
  // sign this feature is only access by admin
  await getAdminOrRedirect(organizationId);

  const memberships = await getMemberships(organizationId);

  // check if membership exists
  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) {
    return toActionState("ERROR", "Membership not found");
  }

  // check if user dleeting last admin
  const adminMemberships = (memberships ?? []).filter(
    (membership) => membership.membershipRole === "ADMIN",
  );

  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMemberships.length === 1;

  if (removesAdmin && isLastAdmin) {
    return toActionState(
      "ERROR",
      "You cannot delete the last admin of an organization",
    );
  }

  // update membership role
  await prisma.membership.update({
    where: {
      membershipId: {
        organizationId,
        userId,
      },
    },
    data: {
      membershipRole,
    },
  });

  revalidatePath(membershipsPath(organizationId));
  return toActionState("SUCCESS", "Membership role updated successfully");
};
