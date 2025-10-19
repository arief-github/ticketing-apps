"use client"

import { Ticket, TicketStatus } from "@prisma/client";
import { Trash } from "lucide-react";
import { toast } from "sonner";

import { updateTicketStatus } from "@/app/tickets/actions/update-ticket-status";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { TICKET_STATUS_LABEL } from "../constants";

type TicketMenuProps = {
    ticket: Ticket,
    trigger: React.ReactNode
}

const TicketMoreMenu = ({ ticket, trigger }: TicketMenuProps) => {
    const handleUpdateTicketStatus = async (value: string) => {
        const result = await updateTicketStatus(ticket.id, value as TicketStatus)

        if (result.status === 'ERROR') {
            toast.error(result.message)
        } else if (result.status === 'SUCCESS') {
            toast.success(result.message)
        }
    }

    const deleteButton = (
        <DropdownMenuItem>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    )

    const ticketStatusRadioGroupItems = (
        <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
            {
                Object.entries((TICKET_STATUS_LABEL)).map(([key, label]) => (
                    <DropdownMenuRadioItem key={key} value={key}>
                        {label}
                    </DropdownMenuRadioItem>
                ))
            }
        </DropdownMenuRadioGroup>
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="right">
                {ticketStatusRadioGroupItems}
                <DropdownMenuSeparator />
                {deleteButton}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export { TicketMoreMenu }