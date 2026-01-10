import { redirect } from "next/navigation";

import { emailVerificationPath, signInPath } from "@/paths";

import { getAuth } from "../actions/get-auth";

type GetAuthRedirectOptions = {
    checkEmailVerified?: boolean;
}

export const getAuthOrRedirect = async ({ checkEmailVerified = true }: GetAuthRedirectOptions = {}) => {
    const auth = await getAuth();
    if (!auth.user) {
        redirect(signInPath());
    }

    if (checkEmailVerified && !auth.user.emailVerified) {
        redirect(emailVerificationPath());
    }

    return auth;
};