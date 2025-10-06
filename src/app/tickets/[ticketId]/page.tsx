import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

import NotFound from "./not-found";

const TicketDetailsPage = async ({ params }: { params: Promise<{ ticketId: string }> }) => {
    const { ticketId } = await params;
    const ticket = await getTicket(ticketId)
    if (!ticket) {
        return <NotFound />
    }

    return (
        <div className="flex justify-center animate-fade-in-from-top">
            <TicketItem ticket={ticket} isDetail={true} />
        </div>
    )
}


export default TicketDetailsPage