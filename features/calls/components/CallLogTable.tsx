'use client';
import { useState, useEffect, Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody } from '@/components/ui/table';
import { Search } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import DynamicCallDetails from '@/features/calls/components/CallDetails/Wrapper';
import { Call } from '../types';
import { useCallData } from '../hooks/useCallData';
import CallFilters from './CallFilters';
import DynamicCallTableContent from './CallTableContent/Wrapper';
import { CallTableHeader } from './CallTableHeader';
import LazyCallTablePagination from './CallTablePagination/Wrapper';
import CallTableFullSkeleton from './Skeletons/CallTableFullSkeleton';

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
        <CallFilters
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

      <LazyCallTablePagination
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
            <SheetContent
              side="right"
              className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-lg"
            >
              <SheetHeader className="flex-shrink-0 p-6 pb-0">
                <SheetTitle>Call Details</SheetTitle>
                <SheetDescription>
                  View detailed information about the selected call.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-grow overflow-hidden">
                <DynamicCallDetails call={selectedCall} />
              </div>
            </SheetContent>
          </Sheet>
        </Suspense>
      )}
    </div>
  );
}
