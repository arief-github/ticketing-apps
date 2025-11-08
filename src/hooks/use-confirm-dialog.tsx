"use client";
import { cloneElement, useActionState, useState } from "react";
import { cloneElement, useActionState, useState } from "react";

import { Form } from "@/components/shared/Form";
import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { SubmitButton } from "@/components/shared/SubmitButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ActionState, EMPTY_ACTION_STATE } from "@/utils/to-action-state";

type useConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: () => void }>;
};

const useConfirmDialog = ({
  title = "Are you absolutely sure ?",
  description = "This action cannot be undone, This will permanently delete your account and remove your data from our server",
  action,
  trigger,
}: useConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);
  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form action={formAction} actionState={actionState}>
              <SubmitButton label="Confirm" />
            </Form>
            <Form action={formAction} actionState={actionState}>
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

export { useConfirmDialog };
