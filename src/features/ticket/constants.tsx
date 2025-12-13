import { CircleCheck, FileText, Pencil } from "lucide-react";

type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE";

type TicketIconsType = { [key in TicketStatus]: React.ReactNode };
type TicketIconstLabel = { [key in TicketStatus]: string };

import { createSearchParamsCache, parseAsString } from "nuqs/server";

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

export const searchParamsCache = createSearchParamsCache({
  search: parseAsString.withDefault(""),
  sort: parseAsString.withDefault("newest"),
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
