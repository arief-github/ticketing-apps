"use server";

import { revalidatePath } from "next/cache";

import { setCookieByKey } from "@/app/actions";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/paths";
import { toActionState } from "@/utils/to-action-state";

import { getMemberships } from "../queries/get-memberships";

type deleteMembershipsProps = {
  userId: string;
  organizationId: string;
};

export const deleteMemberships = async ({
  userId,
  organizationId,
}: deleteMembershipsProps) => {
  const { user } = await getAuthOrRedirect();

  const memberships = await getMemberships(organizationId);

  const isLastMembership = (memberships ?? []).length <= 1;

  if (isLastMembership) {
    return toActionState(
      "ERROR",
      "You cannot delete the last membership of an organization",
    );
  }

  //   Check if membership exists
  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) {
    return toActionState("ERROR", "Membership not found");
  }

  //   Check if user is deleting last admin
  const adminMemberships = (memberships ?? []).filter(
    (membership) => membership.membershipRole === "ADMIN",
  );

  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMemberships.length <= 1;

  if (removesAdmin && isLastAdmin) {
    return toActionState(
      "ERROR",
      "You cannot delete the last admin of an organization",
    );
  }

  const myMembership = (memberships ?? []).find(
    (membership) => membership.userId === user.id,
  );

  const isMySelf = user.id === userId;
  const isAdmin = myMembership?.membershipRole === "ADMIN";

  if (!isMySelf && !isAdmin) {
    return toActionState("ERROR", "You can only delete membership as an admin");
  }

  await prisma.membership.delete({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  revalidatePath(membershipsPath(organizationId));

  await setCookieByKey(
    "toast",
    isMySelf ? "You left the organization" : "Membership deleted successfully",
  );
};
