import { Ticket } from "@prisma/client";
import clsx from "clsx";
import { Pencil, SquareArrowOutUpRight, TrashIcon } from "lucide-react";
import Link from "next/link";

import { deleteTicket } from "@/app/tickets/actions/delete-ticket";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

import { TICKET_ICONS } from "../constants";

type TicketItemProps = {
    ticket: Ticket,
    isDetail?: boolean
}

export const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
    const detailButton = (
        <Button asChild variant='outline' size='icon'>
            <Link
                key={ticket.id}
                prefetch={true}
                href={ticketPath(ticket.id)}
                className="text-sm underline"
            >
                <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
        </Button>
    )

    const editButton = (
        <Button variant='outline' size='icon' asChild>
            <Link prefetch href={ticketEditPath(ticket.id)}>
                <Pencil className="h-4 w-4" />
            </Link>
        </Button>
    )

    const deleteButton = (
        <form action={deleteTicket.bind(null, ticket.id)}>
            <Button variant='outline' size='icon'>
                <TrashIcon className="h-4 w-4" />
            </Button>
        </form>
    )

    return (
        <div className={clsx("w-full flex flex-1 gap-x-1", {
            "max-w-[580px]": isDetail,
            "max-w-[420px]": !isDetail
        })}>
            <Card
                key={ticket.id}
                className="w-full"
            >
                <CardHeader>
                    <CardTitle>
                        <div>{TICKET_ICONS[ticket.status]}</div>
                        <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <span className={clsx("whitespace-break-spaces", {
                        "line-clamp-3": !isDetail
                    })}>{ticket.content}</span>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">
                        {toCurrencyFromCent(ticket.bounty)}
                    </p>
                </CardFooter>
            </Card>
            {
                <div className="flex flex-col gap-y-1">
                    {isDetail ? (
                        <>
                            {editButton}
                            {deleteButton}
                        </>
                    ) : (
                        <>
                            {detailButton}
                            {editButton}
                        </>
                    )}
                </div>
            }
        </div>
    )
}
