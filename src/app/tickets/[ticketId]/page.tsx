import Link from "next/link";

import Placeholder from "@/components/shared/Placeholder";
import { Button } from "@/components/ui/button";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { ticketsPath } from "@/paths";

type TicketDetailProps = {
    params: {
        ticketId: string;
    };
}

const TicketDetailsPage = async ({ params }: TicketDetailProps) => {
    const { ticketId } = await params;
    const ticket = await getTicket(ticketId)
    if (!ticket) {
        return <Placeholder
            label="Ticket not found"
            button={
                <Button asChild variant={'outline'}>
                    <Link href={ticketsPath()}>Go To Tickets</Link>
                </Button>
            }
        />
    }

    return (
        <div className="flex justify-center animate-fade-in-from-top">
            <TicketItem ticket={ticket} isDetail={true} />
        </div>
    )
}


export default TicketDetailsPage