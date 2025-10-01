"use client";
import { Ticket } from "@prisma/client";
import { useActionState } from "react";

import { upsertTicket } from "@/app/tickets/actions/upsert-ticket";
import FieldError from "@/components/shared/FieldError";
import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";

type TicketUpdateFormProps = {
    ticket?: Ticket
}

export const TicketUpsertForm = ({ ticket }: TicketUpdateFormProps) => {
    const [actionState, action] = useActionState(upsertTicket.bind(null, ticket?.id), EMPTY_ACTION_STATE)

    return (
        <Form action={action} actionState={actionState}>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={(actionState.payload?.get('title') as string) ?? ticket?.title} />
            <FieldError actionState={actionState} name="title" />

            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={(actionState.payload?.get("content") as string) ?? ticket?.content} />
            <FieldError actionState={actionState} name="content" />

            <SubmitButton label={ticket ? "Edit" : "Create"} />
        </Form>
    )
}