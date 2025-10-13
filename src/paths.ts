const ticketsPath = (): string => '/tickets'
const ticketPath = (ticketId: string): string => `/tickets/${ticketId}`
const ticketEditPath = (ticketId: string): string => `/tickets/${ticketId}/edit`
const homePath = (): string => '/'

export {
    homePath,
    ticketEditPath,
    ticketPath,
    ticketsPath}