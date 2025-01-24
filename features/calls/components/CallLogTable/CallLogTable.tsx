'use client';
import { useState, useEffect, Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody } from '@/components/ui/table';
import { Search } from 'lucide-react';

import { useCallData } from '../../hooks/useCallData';
import { CallTableHeader } from '../CallTableHeader';
import { Call } from '../../types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import DynamicCallDetails from '@/components/main/calls/CallDetails/Wrapper';
import DynamicCallTableContent from '../CallTableContent/Wrapper';
import DynamicCallTablePagination from '../CallTablePagination/Wrapper';
import DynamicCallFilters from '../CallFilters/Wrapper';
import CallTableFullSkeleton from '../Skeletons/CallTableFullSkeleton';

export default function CallLogTable({
  initialCalls,
}: {
  initialCalls: Call[];
}) {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const {
    calls,
    isLoading,
    isFetching,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    dateRange,
    setDateRange,
    rowsPerPage,
    setRowsPerPage,
    handleNextPage,
    handlePreviousPage,
    paginationKeys,
    setPaginationKeys,
  } = useCallData(initialCalls);

  useEffect(() => {
    setPaginationKeys([]);
  }, [searchQuery, filterType, dateRange, rowsPerPage, setPaginationKeys]);

  if (isLoading) {
    return <CallTableFullSkeleton />;
  }

  return (
    <div className="h-full space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full flex-1 sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Search calls..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9"
            />
          </div>
        </div>
        <DynamicCallFilters
          dateRange={dateRange}
          setDateRange={setDateRange}
          filterType={filterType}
          setFilterType={setFilterType}
        />
      </div>

      <Card className="overflow-hidden bg-white dark:bg-zinc-800/50">
        <div className="overflow-x-auto">
          <Table>
            <CallTableHeader />
            <TableBody>
              <DynamicCallTableContent
                calls={calls}
                isLoading={isLoading}
                isFetching={isFetching}
                rowsPerPage={rowsPerPage}
                searchQuery={searchQuery}
                filterType={filterType}
                dateRange={dateRange}
                onCallSelect={setSelectedCall}
              />
            </TableBody>
          </Table>
        </div>
      </Card>

      <DynamicCallTablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        isDisabledPrevious={
          paginationKeys.length === 0 || isLoading || isFetching
        }
        isDisabledNext={calls.length < rowsPerPage || isLoading || isFetching}
        currentPage={paginationKeys.length + 1}
      />

      {selectedCall && (
        <Suspense fallback={null}>
          <Sheet
            open={selectedCall !== null}
            onOpenChange={() => setSelectedCall(null)}
          >
            <SheetContent side="right" className="w-full p-0 sm:max-w-lg">
              <SheetHeader className="p-4">
                <SheetTitle>Call Details</SheetTitle>
                <SheetDescription>
                  View detailed information about the selected call.
                </SheetDescription>
              </SheetHeader>
              <DynamicCallDetails call={selectedCall} />
            </SheetContent>
          </Sheet>
        </Suspense>
      )}
    </div>
  );
}
