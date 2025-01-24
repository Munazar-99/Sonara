import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CallTablePaginationProps {
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  isDisabledPrevious: boolean;
  isDisabledNext: boolean;
  currentPage: number;
}

const CallTablePagination = ({
  rowsPerPage,
  setRowsPerPage,
  handlePreviousPage,
  handleNextPage,
  isDisabledPrevious,
  isDisabledNext,
  currentPage,
}: CallTablePaginationProps) => (
  <Card className="bg-white p-4 shadow-md dark:bg-zinc-800/50">
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex items-center space-x-2">
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
          size="icon"
          onClick={handlePreviousPage}
          disabled={isDisabledPrevious}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center text-sm">{currentPage}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          disabled={isDisabledNext}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
);

export default CallTablePagination;
