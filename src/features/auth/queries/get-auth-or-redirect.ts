import { redirect } from "next/navigation";

import { getOrganizationByUser } from "@/features/organization/queries/get-organization-by-user";
import { emailVerificationPath, onboardingPath, signInPath } from "@/paths";

import { getAuth } from "../actions/get-auth";

type GetAuthRedirectOptions = {
    checkEmailVerified?: boolean;
    checkOrganization?: boolean;
}

export const getAuthOrRedirect = async ({ checkEmailVerified = true, checkOrganization = true }: GetAuthRedirectOptions = {}) => {
    const auth = await getAuth();
    if (!auth.user) {
        redirect(signInPath());
    }

    if (checkEmailVerified && !auth.user.emailVerified) {
        redirect(emailVerificationPath());
    }

    
    if(checkOrganization) {
        const organizations = await getOrganizationByUser()
        if(!organizations.length) {
            redirect(onboardingPath())
        }
    }

    return auth;
};