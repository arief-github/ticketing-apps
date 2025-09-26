import { Suspense } from "react";

import { CardFormTicket } from "@/components/composition/CardFormTicket";
import Heading from '@/components/shared/Heading';
import Spinner from "@/components/shared/Spinner";
import { TicketList } from '@/features/ticket/components/ticket-list';
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

const TicketsPage = async () => {
    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title='Tickets Page' description=' All your tickets at one place' />

            <CardFormTicket
                title="Create Ticket"
                description="A new ticket will be created"
                className="w-full max-w-[420px] self-center"
                content={<TicketUpsertForm />}
            />

            <Suspense fallback={<Spinner />}>
                <TicketList />
            </Suspense>
        </div>
    )
}

export default TicketsPage;