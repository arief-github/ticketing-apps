"use client";

import { useActionState } from "react";

import { switchOrganization } from "@/features/organization/actions/switch-organization";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";

import { Form } from "./Form";

type OrganizationSwitchButtonProps = {
  organizationId: string;
  trigger: React.ReactElement;
};

const OrganizationSwitchButton = ({
  organizationId,
  trigger,
}: OrganizationSwitchButtonProps) => {
  const [actionState, action] = useActionState(
    switchOrganization.bind(null, organizationId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      {trigger}
    </Form>
  );
};

export { OrganizationSwitchButton };
