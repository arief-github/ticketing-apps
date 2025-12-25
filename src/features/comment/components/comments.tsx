"use client";

import { CardFormTicket } from "@/components/composition/CardFormTicket";
import { Button } from "@/components/ui/button";

import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import CommentCreateForm from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import CommentItem from "./comment-item";

type CommentProps = {
  ticketId: string;
  comments?: CommentWithMetadata[];
};

const Comments = ({ ticketId, comments = [] }: CommentProps) => {
  const handleMore = async () => {
    const result = await getComments(ticketId);
    console.log(result);
  };

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
              ...(comment.isOwner
                ? [<CommentDeleteButton key="0" id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center ml-0">
        <Button variant="ghost" onClick={handleMore}>
          Load More
        </Button>
      </div>
    </>
  );
};

export { Comments };
