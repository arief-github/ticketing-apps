import { redirect } from "next/navigation";

import { getOrganizationByUser } from "@/features/organization/queries/get-organization-by-user";
import {
  emailVerificationPath,
  onboardingPath,
  selectActiveOrganizationPath,
  signInPath,
} from "@/paths";

import { getAuth } from "../actions/get-auth";

type GetAuthRedirectOptions = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
  checkActiveOrganization?: boolean;
};

export const getAuthOrRedirect = async ({
  checkEmailVerified = true,
  checkOrganization = true,
  checkActiveOrganization = true,
}: GetAuthRedirectOptions = {}) => {
  const auth = await getAuth();
  if (!auth.user) {
    redirect(signInPath());
  }

  if (checkEmailVerified && !auth.user.emailVerified) {
    redirect(emailVerificationPath());
  }

  let activeOrganization;

  if (checkOrganization || checkActiveOrganization) {
    const organizations = await getOrganizationByUser();
    if (checkOrganization && !organizations.length) {
      redirect(onboardingPath());
    }

    activeOrganization = organizations.find((org) => {
      return org.membershipByUser.isActive;
    });

    const hasActive = !!activeOrganization;

    if (!hasActive && checkActiveOrganization) {
      redirect(selectActiveOrganizationPath());
    }
  }

  return { ...auth, activeOrganization };
};
