"use client";

import { Label } from "@radix-ui/react-label";
import { useActionState } from "react";

import { CardFormTicket } from "@/components/composition/CardFormTicket";
import FieldError from "@/components/shared/FieldError";
import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/features/auth/actions/request-password-reset";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";

const ForgotPasswordPage = () => {
  const [actionState, action] = useActionState(
    requestPasswordReset,
    EMPTY_ACTION_STATE
  );

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardFormTicket
        title="Forgot Password"
        description="Forgot Your Password"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={
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
        }
      />
    </div>
  );
};

export default ForgotPasswordPage;
