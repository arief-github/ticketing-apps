import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { CardFormTicket } from "@/components/composition/CardFormTicket";
import Heading from "@/components/shared/Heading";
import Spinner from "@/components/shared/Spinner";
import { getAuth } from "@/features/auth/actions/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { searchParamsCache } from "@/features/ticket/constants";

type TicketsOrganizationPageProps = {
  searchParams: SearchParams;
};

const TicketsOrganizationPage = async ({
  searchParams,
}: TicketsOrganizationPageProps) => {
  const { user } = await getAuth();
  const parsedSearchParams = await searchParamsCache.parse(searchParams);

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Our Ticker"
        description=" All tickets related to my organization"
      />

      <CardFormTicket
        title="Create Ticket"
        description="A new ticket will be created"
        className="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList
          byOrganization
          userId={user?.id}
          searchParams={parsedSearchParams}
        />
      </Suspense>
    </div>
  );
};

export default TicketsOrganizationPage;
