const ticketsPath = (): string => '/tickets'
const ticketPath = (ticketId: string): string => `/tickets/${ticketId}`
const ticketEditPath = (ticketId: string): string => `/tickets/${ticketId}/edit`
const homePath = (): string => '/'
const signInPath = (): string => '/sign-in' 
const signUpPath = (): string => '/sign-up'
const forgotPasswordPath =  (): string => '/forgot-password'
const accountProfilePath = (): string => '/account/profile'
const accountPasswordPath = (): string => '/account/password'
const emailVerificationPath = (): string => '/email-verification'

export {
    accountPasswordPath,
    accountProfilePath,
    emailVerificationPath,
    forgotPasswordPath,
    homePath,
    signInPath,
    signUpPath,
    ticketEditPath,
    ticketPath,
    ticketsPath}