"use client";

import { useQueryStates } from "nuqs";

import {
  paginationOptions,
  paginationParser,
} from "@/features/ticket/constants";

import Pagination from "../shared/Pagination";

export const TicketPagination = () => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  return <Pagination pagination={pagination} onPagination={setPagination} />;
};
