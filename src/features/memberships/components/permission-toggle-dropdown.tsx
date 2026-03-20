"use client";

import { BanIcon, CheckIcon } from "lucide-react";
import { useActionState } from "react";

import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";

import { togglePermission } from "../actions/toggle-permission";

type PermissionToggleDropdown = {
  userId: string;
  organizationId: string;
  permissionKey: "canDeleteTicket";
  permissionValue: boolean;
};

export const PermissionToggleDropdown = ({
  userId,
  organizationId,
  permissionKey,
  permissionValue,
}: PermissionToggleDropdown) => {
  const [actionState, action] = useActionState(
    togglePermission.bind(null, {
      userId,
      organizationId,
      permissionKey,
    }),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton
        variant={permissionValue ? "secondary" : "outline"}
        size="icon"
        icon={permissionValue ? <CheckIcon /> : <BanIcon />}
      />
    </Form>
  );
};
