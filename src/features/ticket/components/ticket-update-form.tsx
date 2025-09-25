import { Ticket } from "@prisma/client";

import { updateTicket } from "@/app/tickets/actions/update-ticket";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TicketUpdateFormProps = {
    ticket: Ticket
}

export const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
    return (
        <form action={updateTicket.bind(null, ticket.id as string)} className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" type="text" defaultValue={ticket.title} />

            <Label htmlFor="content">Content</Label>
            <Textarea id="content" name="content" defaultValue={ticket.content} />

            <Button type="submit">Update</Button>
        </form>
    )
}