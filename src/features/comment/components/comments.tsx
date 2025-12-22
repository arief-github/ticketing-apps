import { CardFormTicket } from "@/components/composition/CardFormTicket";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";

import { getComments } from "../queries/get-comments";
import CommentCreateForm from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import CommentItem from "./comment-item";

type CommentProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentProps) => {
  const comments = await getComments(ticketId);
  const { user } = await getAuth();

  return (
    <>
      <CardFormTicket
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(isOwner({ user, entity: comment })
                ? [<CommentDeleteButton key="0" id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  );
};

export { Comments };
