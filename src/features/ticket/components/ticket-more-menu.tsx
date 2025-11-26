"use client";

import { Ticket, TicketStatus } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { deleteTicket } from "@/app/tickets/actions/delete-ticket";
import { updateTicketStatus } from "@/app/tickets/actions/update-ticket-status";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";

import { TICKET_STATUS_LABEL } from "../constants";

type TicketMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="icon" title="Delete">
          <TrashIcon className="h-4 w-4" />
        </Button>
        <span>Delete</span>
      </div>
    ),
  });

  const handleUpdateTicketStatus = async (value: string) => {
    const result = await updateTicketStatus(ticket.id, value as TicketStatus);

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {Object.entries(TICKET_STATUS_LABEL).map(([key, label]) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {label}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { TicketMoreMenu };
