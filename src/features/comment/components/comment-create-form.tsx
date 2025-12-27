"use client";

import { useActionState } from "react";

import FieldError from "@/components/shared/FieldError";
import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { ActionState, EMPTY_ACTION_STATE } from "@/utils/to-action-state";

import { createComment } from "../actions/create-comment";
import { CommentWithMetadata } from "../types";

type CommentCreateForm = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateForm) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE
  );

  const handleSuccess = (actionState: ActionState) => {
    onCreateComment?.(actionState.data as CommentWithMetadata);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder="What's on your mind..." />
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label="Comment" />
    </Form>
  );
};

export default CommentCreateForm;
