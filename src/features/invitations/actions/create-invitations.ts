"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getAdminOrRedirect } from "@/features/memberships/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";
import { invitationsPath } from "@/paths";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/utils/to-action-state";

const createInvitationSchema = z.object({
  email: z.string().min(1, { message: "Is required" }),
});

export const createInvitation = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  await getAdminOrRedirect(organizationId);

  try {
    const { email } = createInvitationSchema.parse({
      email: formData.get("email"),
    });

    // Prevent to invite user that has already join the organization
    const targetMembership = await prisma.membership.findFirst({
      where: {
        organizationId,
        user: {
          email,
        },
      },
    });

    if (targetMembership) {
      return toActionState(
        "ERROR",
        "User is already a member of this organization",
      );
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(invitationsPath(organizationId));
  return toActionState("SUCCESS", "Invitation sent successfully");
};
