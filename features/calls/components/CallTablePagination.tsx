import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CallTablePaginationProps {
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  isDisabledPrevious: boolean;
  isDisabledNext: boolean;
}

export default function CallTablePagination({
  rowsPerPage,
  setRowsPerPage,
  handlePreviousPage,
  handleNextPage,
  isDisabledPrevious,
  isDisabledNext,
}: CallTablePaginationProps) {
  return (
    <Card className="bg-white dark:bg-zinc-800/50">
      <div className="flex flex-col items-center justify-between p-4 sm:flex-row">
        <div className="mb-4 flex items-center space-x-2 sm:mb-0">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={value => setRowsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePreviousPage}
            disabled={isDisabledPrevious}
            className="p-4"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="p-4"
            size="lg"
            onClick={handleNextPage}
            disabled={isDisabledNext}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
