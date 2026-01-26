"use client";

import { useActionState } from "react";

import FieldError from "@/components/shared/FieldError";
import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";

import { createOrganization } from "../actions/create-organization";

const OrganizationCreateForm = () => {
  const [actionState, action] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE
  );

  return (
    <Form actionState={actionState} action={action}>
      <Input
        name="name"
        placeholder="Organization Name"
        defaultValue={actionState.payload?.get("name") as string}
      />

      <FieldError actionState={actionState} name="name" />
      <SubmitButton label="Create" />
    </Form>
  );
};

export { OrganizationCreateForm };
