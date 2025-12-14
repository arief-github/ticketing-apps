import { CircleCheck, FileText, Pencil } from "lucide-react";
import { createSearchParamsCache, parseAsString } from "nuqs/server";

// TICKET CONSTANTS
type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE";

type TicketIconsType = { [key in TicketStatus]: React.ReactNode };
type TicketIconstLabel = { [key in TicketStatus]: string };

export const TICKET_ICONS: TicketIconsType = {
  OPEN: <FileText />,
  IN_PROGRESS: <Pencil />,
  DONE: <CircleCheck />,
};

export const TICKET_STATUS_LABEL: TicketIconstLabel = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

// TICKET SEARCH AND SORT PARAMS
export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const sortParser = parseAsString
  .withDefault("createdAt_desc")
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  sort: sortParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
