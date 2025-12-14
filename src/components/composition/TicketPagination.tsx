"use client";

import { useQueryStates } from "nuqs";

import {
  paginationOptions,
  paginationParser,
} from "@/features/ticket/constants";

import Pagination from "../shared/Pagination";

type TicketPaginationProps = {
  paginatedTicketMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginateMetadata={paginatedTicketMetadata}
    />
  );
};
