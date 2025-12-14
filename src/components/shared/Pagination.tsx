import { Button } from "../ui/button";

type PageAndSize = Record<"page" | "size", number>;

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginateMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

const Pagination = ({
  pagination,
  paginateMetadata,
  onPagination,
}: PaginationProps) => {
  const { count, hasNextPage } = paginateMetadata;
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset + pagination.size - 1;
  const actualEndOffset = Math.min(endOffset, count);

  const label = `${startOffset} - ${actualEndOffset} of ${count}`;

  const handlePreviousPage = () => {
    onPagination({ ...pagination, page: pagination.page - 1 });
  };
  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Prev
    </Button>
  );

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-x-2">
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export default Pagination;
