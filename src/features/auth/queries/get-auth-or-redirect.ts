import { redirect } from "next/navigation";

import { getOrganizationByUser } from "@/features/organization/queries/get-organization-by-user";
import { emailVerificationPath, onboardingPath, selectActiveOrganizationPath,signInPath} from "@/paths";

import { getAuth } from "../actions/get-auth";

type GetAuthRedirectOptions = {
    checkEmailVerified?: boolean;
    checkOrganization?: boolean;
    checkActiveOrganization?: boolean;
}

export const getAuthOrRedirect = async ({ checkEmailVerified = true, checkOrganization = true, checkActiveOrganization = true }: GetAuthRedirectOptions = {}) => {
    const auth = await getAuth();
    if (!auth.user) {
        redirect(signInPath());
    }

    if (checkEmailVerified && !auth.user.emailVerified) {
        redirect(emailVerificationPath());
    }

    
    if(checkOrganization || checkActiveOrganization) {
        const organizations = await getOrganizationByUser()
        if(!organizations.length && checkOrganization) {
            redirect(onboardingPath())
        }

        const hasActive = organizations.some((org) => {
            return org.membershipByUser.isActive
        })

        if(!hasActive && checkActiveOrganization) {
            redirect(selectActiveOrganizationPath())
        }
    }

    return auth;
};