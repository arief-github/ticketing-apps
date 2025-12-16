"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";

import {
  paginationOptions,
  paginationParser,
  searchParser,
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

  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  // reactive changes
  useEffect(() => {
    if (search === prevSearch.current) return;

    prevSearch.current = search;

    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginateMetadata={paginatedTicketMetadata}
    />
  );
};
