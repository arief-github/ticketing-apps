import { sendEmailInvitation } from "@/lib/email";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

export type InvitationCreatedEventArgs = {
  data: {
    userId: string;
    organizationId: string;
    email: string;
    emailInvitationLink: string;
  };
};

export const invitationCreatedEvent = inngest.createFunction(
  {
    id: "invitation-created",
    retries: 3,
    onFailure: async ({ event, error }) => {
      console.error(
        `Failed to send invitation email to ${event.data.event.data.email} after retries. Error: ${error.message}`,
      );
    },
  },
  { event: "app/invitation.created" },
  async ({ event }) => {
    const { userId, organizationId, email, emailInvitationLink } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const organization = await prisma.organization.findUniqueOrThrow({
      where: {
        id: organizationId,
      },
    });

    const result = await sendEmailInvitation({
      username: user.username,
      organizationName: organization.name,
      email,
      emailInvitationLink,
    });

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: true };
  },
);
