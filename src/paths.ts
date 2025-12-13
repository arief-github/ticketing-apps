const ticketsPath = (): string => '/tickets'
const ticketPath = (ticketId: string): string => `/tickets/${ticketId}`
const ticketEditPath = (ticketId: string): string => `/tickets/${ticketId}/edit`
const homePath = (): string => '/'
const signInPath = (): string => '/sign-in' 
const signUpPath = (): string => '/sign-up'
const forgotPasswordPath =  (): string => '/forgot-password'
const accountProfilePath = (): string => '/account/profile'
const accountPasswordPath = (): string => '/account/password'

export {
    accountPasswordPath,
    accountProfilePath,
    forgotPasswordPath,
    homePath,
    signInPath,
    signUpPath,
    ticketEditPath,
    ticketPath,
    ticketsPath}