const ticketsPath = (): string => '/tickets'
const ticketPath = (ticketId: string): string => `/tickets/${ticketId}`
const ticketEditPath = (ticketId: string): string => `/tickets/${ticketId}/edit`
const homePath = (): string => '/'
const signInPath = (): string => '/sign-in' 
const signUpPath = (): string => '/sign-up'
const forgotPasswordPath =  (): string => '/forgot-password'

export {
    forgotPasswordPath,
    homePath,
    signInPath,
    signUpPath,
    ticketEditPath,
    ticketPath,
    ticketsPath}