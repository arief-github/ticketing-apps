import { EventSchemas, Inngest } from "inngest";

import { EmailVerificationEventArgs } from "@/features/auth/events/event-email-verification";
import { PasswordResetEventArgs } from "@/features/auth/events/event-password-reset";
import { InvitationCreatedEventArgs } from "@/features/invitations/events/event-invitation-created";

type Events = {
  "app/auth.password-reset-request": PasswordResetEventArgs;
  "app/auth.sign-up": EmailVerificationEventArgs;
  "app/invitation.created": InvitationCreatedEventArgs;
};

export const inngest = new Inngest({
  id: "ticketing-app",
  schemas: new EventSchemas().fromRecord<Events>(),
  env: process.env.INNGEST_BRANCH || process.env.VERCEL_GIT_COMMIT_REF,
});
