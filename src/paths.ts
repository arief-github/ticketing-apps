const ticketsPath = (): string => '/tickets'
const ticketPath = (ticketId: string): string => `/tickets/${ticketId}`
const homePath = (): string => '/'

export {
    homePath,
    ticketPath,
    ticketsPath
}