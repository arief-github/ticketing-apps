import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import Heading from "@/components/shared/Heading";
import Spinner from "@/components/shared/Spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { searchParamsCache } from "@/features/ticket/constants";

type HomepageProps = {
  searchParams: SearchParams;
};

export default async function Home({ searchParams }: HomepageProps) {
  const parsedSearchParams = await searchParamsCache.parse(searchParams);

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All Tickets"
        description="Tickets by everyone at one place"
      />

      <div className="flex-1 flex flex-col items-center">
        <Suspense fallback={<Spinner />}>
          <TicketList searchParams={parsedSearchParams} />
        </Suspense>
      </div>
    </div>
  );
}
