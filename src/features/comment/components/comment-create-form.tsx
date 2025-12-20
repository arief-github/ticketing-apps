"use client";

import { useActionState } from "react";

import FieldError from "@/components/shared/FieldError";
import { Form } from "@/components/shared/Form";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY_ACTION_STATE } from "@/utils/to-action-state";

import { createComment } from "../actions/create-comment";

type CommentCreateForm = {
  ticketId: string;
};

const CommentCreateForm = ({ ticketId }: CommentCreateForm) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Textarea name="content" placeholder="What's on your mind..." />
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label="Comment" />
    </Form>
  );
};

export default CommentCreateForm;
