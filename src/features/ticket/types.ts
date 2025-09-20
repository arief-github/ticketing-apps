export type TicketStatus = 'DONE' | 'OPEN' | 'IN_PROGRESS'

export type TicketTypes = {
    id: string;
    title: string;
    content: string;
    status: TicketStatus
}