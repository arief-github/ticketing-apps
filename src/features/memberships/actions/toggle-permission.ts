"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/paths";
import { toActionState } from "@/utils/to-action-state";

import { getAdminOrRedirect } from "../queries/get-admin-or-redirect";

type PermissionKey = "canDeleteTicket";

type TogglePermissionProps = {
  permissionKey: PermissionKey;
  organizationId: string;
  userId: string;
};

export const togglePermission = async ({
  permissionKey,
  organizationId,
  userId,
}: TogglePermissionProps) => {
  await getAdminOrRedirect(organizationId);

  const where = {
    membershipId: {
      userId,
      organizationId,
    },
  };

  const membership = await prisma.membership.findUnique({
    where,
  });

  if (!membership) {
    throw new Error("Membership not found");
  }

  await prisma.membership.update({
    where,
    data: {
      [permissionKey]: membership[permissionKey] === true ? false : true,
    },
  });

  revalidatePath(membershipsPath(organizationId));

  return toActionState("SUCCESS", "Permission updated");
};
