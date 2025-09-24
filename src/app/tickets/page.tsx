// client-side data fetching
// "use client";

import { Suspense } from "react";

import Heading from '@/components/shared/Heading';
import Spinner from "@/components/shared/Spinner";
import { TicketList } from '@/features/ticket/components/ticket-list';

// incremental static settings
// static page but revalidate every 5 seconds
//export const revalidate = 5;

// full dynamic page
// export const dynamic = "force-dynamic";

const TicketsPage = async () => {
    // server-side data fetching
    // const tickets = await getTickets()

    // client-side data fetching
    // const [tickets, setTickets] = useState<TicketTypes[]>([])

    // useEffect(() => {
    //     const fetchTickets = async () => {
    //         const result = await getTickets()

    //         setTickets(result)
    //     }

    //     fetchTickets()
    // }, [])

    return (
        <div className="flex-1 flex flex-col gap-y-8">
            <Heading title='Tickets Page' description=' All your tickets at one place' />

            <Suspense fallback={<Spinner />}>
                <TicketList />
            </Suspense>
        </div>
    )
}

export default TicketsPage;