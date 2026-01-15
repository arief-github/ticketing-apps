"use client";

import { useActionState } from "react";

import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";

import { emailVerificationResend } from "../actions/email-verification-resend";

const EmailVerificationResendForm = () => {
  const [actionState, action] = useActionState(
    emailVerificationResend,
    EMPTY_ACTION_STATE
  );

  return (
    <Form actionState={actionState} action={action}>
      <SubmitButton label="Resend Verification Email" variant="ghost" />
    </Form>
  );
};

export { EmailVerificationResendForm };
