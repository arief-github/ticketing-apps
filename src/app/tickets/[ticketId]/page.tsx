import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath } from "@/paths";

import NotFound from "./not-found";

const TicketDetailsPage = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  if (!ticket) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />

      <Separator />

      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail={true} />
      </div>
    </div>
  );
};

export default TicketDetailsPage;
