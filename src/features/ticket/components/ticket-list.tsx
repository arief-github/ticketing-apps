import Placeholder from "@/components/shared/Placeholder";
import SearchInput from "@/components/shared/SearchInput";

import { SearchParams } from "../constants";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string | undefined;
  searchParams: SearchParams;
};

export const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="max-w-[420px] w-full">
        <SearchInput placeholder="Search ticket" />
      </div>
      {tickets.length > 0 ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};
