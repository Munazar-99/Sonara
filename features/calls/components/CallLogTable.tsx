'use client';
import { useState, useEffect, lazy } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody } from '@/components/ui/table';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCallData } from '../hooks/useCallData';
import { Call } from '../types';
import { dateRanges } from '../utils';
import { CallTableContent } from './CallTableContent';
import { CallTableHeader } from './CallTableHeader';

const CallDetails = lazy(() =>
  import('@/components/main/calls/CallDetails').then(mod => ({
    default: mod.default,
  })),
);
const CallTablePagination = lazy(() =>
  import('./CallTablePagination').then(mod => ({
    default: mod.default,
  })),
);

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
    // Reset pagination when filters change
    setPaginationKeys([]);
  }, [searchQuery, filterType, dateRange, rowsPerPage, setPaginationKeys]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full space-y-6"
    >
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
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(dateRanges).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filterType}
            onValueChange={(value: string) =>
              setFilterType(value as 'inbound' | 'outbound' | 'all')
            }
          >
            <SelectTrigger className="w-full sm:w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="inbound">Inbound</SelectItem>
              <SelectItem value="outbound">Outbound</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="overflow-hidden bg-white dark:bg-zinc-800/50">
        <div className="overflow-x-auto">
          <Table>
            <CallTableHeader />
            <TableBody>
              <CallTableContent
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

      <CallTablePagination
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        isDisabledPrevious={
          paginationKeys.length === 0 || isLoading || isFetching
        }
        isDisabledNext={calls.length < rowsPerPage || isLoading || isFetching}
      />

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
          {selectedCall && <CallDetails call={selectedCall} />}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
