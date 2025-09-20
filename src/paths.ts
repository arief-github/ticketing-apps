const ticketsPath = (): string => '/tickets'
const ticketPath = (ticketId: string): string => `/ticket/${ticketId}`
const homePath = (): string => '/'

export {
    homePath,
    ticketPath,
    ticketsPath
}