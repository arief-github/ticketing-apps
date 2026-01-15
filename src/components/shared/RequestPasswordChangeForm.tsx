"use client";

import { useActionState } from "react";

import FieldError from "@/components/shared/FieldError";
import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/features/auth/actions/request-password-reset";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";

import { Label } from "../ui/label";

const RequestPasswordChangeForm = () => {
  const [actionState, action] = useActionState(
    requestPasswordReset,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        placeholder="Enter your email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />

      <SubmitButton label="Send Reset Link" />
    </Form>
  );
};

export default RequestPasswordChangeForm;
