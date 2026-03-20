const ticketsPath = (): string => "/tickets";
const ticketPath = (ticketId: string): string => `/tickets/${ticketId}`;
const ticketEditPath = (ticketId: string): string =>
  `/tickets/${ticketId}/edit`;
const ticketOrganizationPath = (): string => "/tickets/organization";
const homePath = (): string => "/";
const signInPath = (): string => "/sign-in";
const signUpPath = (): string => "/sign-up";
const forgotPasswordPath = (): string => "/forgot-password";
const accountProfilePath = (): string => "/account/profile";
const accountPasswordPath = (): string => "/account/password";
const emailVerificationPath = (): string => "/email-verification";
const invitationsPath = (organizationId: string) =>
  `/organization/${organizationId}/invitations`;
const organizationPath = (): string => "/organization";
const selectActiveOrganizationPath = (): string =>
  "/onboarding/select-active-organization";
const organizationCreatePath = (): string => "/organization/create";
const onboardingPath = (): string => "/onboarding";
const membershipsPath = (organizationId: string): string =>
  `/organization/${organizationId}/memberships`;

export {
  accountPasswordPath,
  accountProfilePath,
  emailVerificationPath,
  forgotPasswordPath,
  homePath,
  invitationsPath,
  membershipsPath,
  onboardingPath,
  organizationCreatePath,
  organizationPath,
  selectActiveOrganizationPath,
  signInPath,
  signUpPath,
  ticketEditPath,
  ticketOrganizationPath,
  ticketPath,
  ticketsPath,
};
