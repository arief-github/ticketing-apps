"use client";

<<<<<<< HEAD
import { useState } from "react";

=======
>>>>>>> ed2904d (feat: Add 'Load More' button to comments section and enable server-side fetching for comments.)
import { CardFormTicket } from "@/components/composition/CardFormTicket";
import { Button } from "@/components/ui/button";

import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import CommentCreateForm from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import CommentItem from "./comment-item";

type CommentProps = {
  ticketId: string;
  paginatedComments: {
    list: CommentWithMetadata[];
    metadata: { count: number; hasNextPage: boolean; cursor?: string };
  };
};

<<<<<<< HEAD
const Comments = ({ ticketId, paginatedComments }: CommentProps) => {
  const [comments, setComments] = useState<CommentWithMetadata[]>(
    paginatedComments.list
  );

  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId, metadata.cursor);
    const moreComments = morePaginatedComments.list;
    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);
  };

  const handleDelete = (id: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const handleCreate = (comments: CommentWithMetadata | undefined) => {
    if (!comments) return;

    setComments((prevComments) => [comments, ...prevComments]);
=======
const Comments = ({ ticketId, comments = [] }: CommentProps) => {
  const handleMore = async () => {
    const result = await getComments(ticketId);
    console.log(result);
>>>>>>> ed2904d (feat: Add 'Load More' button to comments section and enable server-side fetching for comments.)
  };

  return (
    <>
      <CardFormTicket
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreate}
          />
        }
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDelete}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center ml-0">
<<<<<<< HEAD
        {metadata.hasNextPage && (
          <Button variant="ghost" onClick={handleMore}>
            Load More
          </Button>
        )}
=======
        <Button variant="ghost" onClick={handleMore}>
          Load More
        </Button>
>>>>>>> ed2904d (feat: Add 'Load More' button to comments section and enable server-side fetching for comments.)
      </div>
    </>
  );
};

export { Comments };
