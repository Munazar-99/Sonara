import { TableCell, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import { CallTableRow } from '../CallTableRow';
import { Call } from '../../types';
import SkeletonRow from '../Skeletons/SkeletonRow';

export interface CallTableContentProps {
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
    return <SkeletonRow rows={rowsPerPage} />;
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

export default CallTableContent;
