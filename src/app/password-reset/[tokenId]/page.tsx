"use client";

import { useActionState } from "react";

import FieldError from "@/components/shared/FieldError";
import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/features/auth/actions/password-reset";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";

const PasswordResetPage = ({
  params: { tokenId },
}: {
  params: {
    tokenId: string;
  };
}) => {
  const [actionState, action] = useActionState(
    resetPassword,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input type="hidden" name="tokenId" value={tokenId} />
      <Label htmlFor="password">New Password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New Password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />
      <SubmitButton label="Reset Password" />
    </Form>
  );
};

export default PasswordResetPage;
