import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

  const handleChangeSize = (value: string) => {
    onPagination({ page: 0, size: parseInt(value) });
  };

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
      className="disabled:cursor-not-allowed"
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
      className="disabled:cursor-not-allowed"
    >
      Next
    </Button>
  );

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            Rows per page
          </p>
          <Select
            value={pagination.size.toString()}
            onValueChange={handleChangeSize}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.size.toString()} />
            </SelectTrigger>
            <SelectContent>
              {[2, 5, 10, 25, 50, 100].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export default Pagination;
