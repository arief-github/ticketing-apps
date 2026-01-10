import { EventSchemas, Inngest } from "inngest";

import  { EmailVerificationEventArgs } from "@/features/auth/events/event-email-verification";
import { PasswordResetEventArgs } from "@/features/auth/events/event-password-reset";

type Events = {
    'app/auth.password-reset-request': PasswordResetEventArgs,
    'app/auth.sign-up': EmailVerificationEventArgs
}

export const inngest = new Inngest({
    id: "ticketing-app",
    schemas: new EventSchemas().fromRecord<Events>(),
})