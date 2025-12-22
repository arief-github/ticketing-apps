import { Prisma } from "@prisma/client";
import clsx from "clsx";
import { MoreVertical, Pencil, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Comments } from "@/features/comment/components/comments";
import { CommentWithMetadata } from "@/features/comment/types";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

import { TICKET_ICONS } from "../constants";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }>;
  isDetail?: boolean;
  comments: CommentWithMetadata[];
};

export const TicketItem = async ({
  ticket,
  isDetail,
  comments = [],
}: TicketItemProps) => {
  const { user } = await getAuth();
  const isTicketOwner = isOwner({ user, entity: ticket });

  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link
        key={ticket.id}
        prefetch={true}
        href={ticketPath(ticket.id)}
        className="text-sm underline"
      >
        <SquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = isTicketOwner ? (
    <Button variant="outline" size="icon" asChild>
      <Link prefetch href={ticketEditPath(ticket.id)}>
        <Pencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  const triggerButton = (
    <Button variant="outline" size="icon">
      <MoreVertical className="h-4 w-4" />
    </Button>
  );

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu ticket={ticket} trigger={triggerButton} />
  ) : null;

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card key={ticket.id} className="w-full">
          <CardHeader>
            <CardTitle>
              <div>{TICKET_ICONS[ticket.status]}</div>
              <h3 className="text-lg font-semibold truncate">{ticket.title}</h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx("whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-y-4">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>
      {isDetail ? (
        <Suspense
          fallback={
            <div className="flex flex-col gap-y-4">
              <Skeleton className="h-[250px] w-full" />
              <Skeleton className="h-[80px] ml-8" />
              <Skeleton className="h-[80px] ml-8" />
            </div>
          }
        >
          <Comments ticketId={ticket.id} comments={comments} />
        </Suspense>
      ) : null}
    </div>
  );
};
