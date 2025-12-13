import Placeholder from "@/components/shared/Placeholder";
import SearchInput from "@/components/shared/SearchInput";
import SortSelect from "@/components/shared/SortSelect";

import { ParsedSearchParams } from "../constants";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string | undefined;
  searchParams: ParsedSearchParams;
};

export const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  const sortOptionsGrouped = {
    timeSortOptions: [
      { label: "Newest", value: "createdAt_desc" },
      { label: "Oldest", value: "createdAt_asc" },
    ],
    bountySortOptions: [
      { label: "Highest", value: "bounty_desc" },
      { label: "Lowest", value: "bounty_asc" },
    ],
    combinedSortOptions: [
      { label: "Highest Bounty (Newest)", value: "bounty_desc,createdAt_desc" },
      { label: "Highest Bounty (Oldest)", value: "bounty_desc,createdAt_asc" },
      { label: "Lowest Bounty (Newest)", value: "bounty_asc,createdAt_desc" },
      { label: "Lowest Bounty (Oldest)", value: "bounty_asc,createdAt_asc" },
    ],
  };

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="max-w-[420px] w-full flex gap-x-2">
        <SearchInput placeholder="Search ticket" />
        <div className="w-[200px] shrink-0">
          <SortSelect
            defaultValue="createdAt_desc"
            options={sortOptionsGrouped}
          />
        </div>
      </div>
      {tickets.length > 0 ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};
