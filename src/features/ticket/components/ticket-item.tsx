import clsx from "clsx";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { TICKET_ICONS } from "../constants";
import { TicketTypes } from "../types";

type TicketItemProps = {
    ticket: TicketTypes,
    isDetail?: boolean
}

export const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
    const detailButton = (
        <Button asChild variant='outline' size='icon'>
            <Link
                key={ticket.id}
                href={`/tickets/${ticket.id}`}
                className="text-sm underline"
            >
                <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
        </Button>
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
            </Card>
            {
                isDetail ? null : (
                    <div className="flex flex-col gap-y-1">
                        {detailButton}
                    </div>
                )
            }
        </div>
    )
}
