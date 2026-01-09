import { EventSchemas, Inngest } from "inngest";

import { PasswordResetEventArgs } from "@/features/auth/events/event-password-reset";

type Events = {
    'app/auth.password-reset-request': PasswordResetEventArgs
}

export const inngest = new Inngest({
    id: "ticketing-app",
    schemas: new EventSchemas().fromRecord<Events>(),
})