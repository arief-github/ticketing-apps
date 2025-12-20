import { CardFormTicket } from "@/components/composition/CardFormTicket";

import { getComments } from "../queries/get-comments";
import CommentCreateForm from "./comment-create-form";
import CommentItem from "./comment-item";

type CommentProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentProps) => {
  const comments = await getComments(ticketId);

  return (
    <>
      <CardFormTicket
        title="Create Comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export { Comments };
