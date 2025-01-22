import { TableCell, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import { CallTableRow } from './CallTableRow';
import { Skeleton } from '@/components/ui/skeleton';
import { Call } from '../types';

interface CallTableContentProps {
  calls: Call[];
  isLoading: boolean;
  isFetching: boolean;
  rowsPerPage: number;
  searchQuery: string;
  filterType: string;
  dateRange: string;
  onCallSelect: (call: Call) => void;
}

export const CallTableContent = ({
  calls,
  isLoading,
  isFetching,
  rowsPerPage,
  searchQuery,
  filterType,
  dateRange,
  onCallSelect,
}: CallTableContentProps) => {
  if (isLoading || isFetching) {
    return Array.from({ length: rowsPerPage }).map((_, index) => (
      <TableRow
        key={`skeleton-${index}`}
        className='dark:hover:bg-zinc-700/50" cursor-pointer transition-colors'
      >
        <TableCell className={`px-4 py-4`}>
          <div className="flex items-center justify-start space-x-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-4 w-[145px]" />
          </div>
        </TableCell>
        <TableCell className={`px-4 py-4`}>
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </TableCell>
        <TableCell className={`px-4 py-4`}>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
        </TableCell>
        <TableCell className={`px-4 py-4`}>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
        </TableCell>
        <TableCell className={`px-4 py-4`}>
          <Skeleton className="h-6 w-24" />
        </TableCell>
      </TableRow>
    ));
  }

  if (calls.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="h-32 text-center">
          <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
            <Search className="h-8 w-8" />
            <p className="text-sm">No calls found</p>
            {searchQuery || filterType !== 'all' || dateRange !== 'month' ? (
              <p className="text-xs">
                Try adjusting your filters or search query
              </p>
            ) : (
              <p className="text-xs">No call history available</p>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return calls.map(call => (
    <CallTableRow
      key={call.id}
      call={call}
      onClick={() => onCallSelect(call)}
    />
  ));
};
