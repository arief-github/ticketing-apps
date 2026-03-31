import { prisma } from "@/lib/prisma";
import { emailInvitationPath } from "@/paths";
import { generateRandomToken, hashToken } from "@/utils/crypto";
import { getBaseUrl } from "@/utils/url";

export const generateInvitationLink = async (
  invitedByUserId: string,
  email: string,
  organizationId: string,
) => {
  await prisma.invitation.deleteMany({
    where: {
      email,
    },
  });

  const tokenId = generateRandomToken();
  const tokenHash = await hashToken(tokenId);

  await prisma.invitation.create({
    data: {
      tokenHash,
      email,
      organizationId,
      invitedByUserId,
    },
  });

  const pageUrl = getBaseUrl() + emailInvitationPath();
  const emailInvitationLink = `${pageUrl}?token=${tokenId}`;

  return emailInvitationLink;
};
