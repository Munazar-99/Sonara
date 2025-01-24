'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Filter,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  DollarSign,
  SmilePlus,
  Frown,
  Meh,
} from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { format, subDays, endOfToday, startOfToday } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import CallDetails from './CallDetails/CallDetails';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchCallsAction } from '@/features/calls/server/fetch-calls.action';

export interface Call {
  id: string;
  dateTime: number;
  direction: 'inbound' | 'outbound';
  callerId: string;
  duration: number | undefined;
  recordingUrl: string;
  cost: number;
  sentiment: string;
}

const dateRanges: Record<
  string,
  { label: string; days: number; lowerThreshold: number }
> = {
  today: { label: 'Today', days: 0, lowerThreshold: startOfToday().getTime() },
  week: {
    label: 'This Week',
    days: 7,
    lowerThreshold: subDays(endOfToday(), 7).getTime(),
  },
  month: {
    label: 'Last 30 Days',
    days: 30,
    lowerThreshold: subDays(endOfToday(), 30).getTime(),
  },
  quarter: {
    label: 'Last 90 Days',
    days: 90,
    lowerThreshold: subDays(endOfToday(), 90).getTime(),
  },
};

export function CallLogTable({ initialCalls }: { initialCalls: Call[] }) {
  const [paginationKeys, setPaginationKeys] = useState<string[]>([]);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'inbound' | 'outbound' | 'all'>(
    'all',
  );
  const [dateRange, setDateRange] = useState<keyof typeof dateRanges>('month');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const currentPaginationKey = paginationKeys[paginationKeys.length - 1];

  const fetchCallsCallback = useCallback(() => {
    return fetchCallsAction({
      limit: rowsPerPage,
      paginationKey: currentPaginationKey,
      lowerThreshold: dateRanges[dateRange].lowerThreshold,
      direction:
        filterType === 'all'
          ? undefined
          : (filterType as 'inbound' | 'outbound'),
      searchQuery,
    });
  }, [rowsPerPage, currentPaginationKey, dateRange, filterType, searchQuery]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'calls',
      {
        paginationKey: currentPaginationKey,
        limit: rowsPerPage,
        dateRange,
        filterType,
        searchQuery,
      },
    ],
    queryFn: fetchCallsCallback,
    initialData: initialCalls,
    refetchOnMount: false,
  });

  const calls = Array.isArray(data) ? data : [];

  useEffect(() => {
    // Reset pagination when filters change
    setPaginationKeys([]);
  }, [searchQuery, filterType, dateRange, rowsPerPage]);

  const formatDuration = (duration: number | undefined) => {
    if (duration === undefined) return 'Missed';
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleNextPage = () => {
    if (calls.length === rowsPerPage) {
      const lastCall = calls[calls.length - 1];
      setPaginationKeys(prev => [...prev, lastCall.id]);
    }
  };

  const handlePreviousPage = () => {
    setPaginationKeys(prev => prev.slice(0, -1));
  };

  const renderTableContent = () => {
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
      <TableRow
        key={call.id}
        className="cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
        onClick={() => setSelectedCall(call)}
      >
        <TableCell className="px-4 py-4">
          <div className="flex items-center justify-start space-x-2">
            <div className="flex items-center justify-center">
              {call.direction === 'inbound' ? (
                <PhoneIncoming className="h-5 w-5 text-green-500" />
              ) : (
                <PhoneOutgoing className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <span className="text-center">{call.callerId}</span>
          </div>
        </TableCell>
        <TableCell className="px-4 py-4 font-medium">
          <div className="flex flex-col">
            <span>{format(new Date(call.dateTime), 'MMM d, yyyy')}</span>
            <span className="text-sm text-muted-foreground">
              {format(new Date(call.dateTime), 'h:mm a')}
            </span>
          </div>
        </TableCell>
        <TableCell className="px-4 py-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatDuration(call.duration)}</span>
          </div>
        </TableCell>
        <TableCell className="px-4 py-4">
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{call.cost.toFixed(2)}</span>
          </div>
        </TableCell>
        <TableCell className="px-4 py-4">
          <div className="flex items-center space-x-1">
            {call.sentiment === 'Positive' ? (
              <SmilePlus className="h-5 w-5 text-green-500" />
            ) : call.sentiment === 'Neutral' ? (
              <Meh className="h-5 w-5 text-yellow-500" />
            ) : (
              <Frown className="h-5 w-5 text-red-500" />
            )}
            <span className="text-sm capitalize">{call.sentiment}</span>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

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
            <TableHeader className="bg-gray-50 dark:bg-zinc-800">
              <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-gray-700">
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Caller ID
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Date & Time
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Duration
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Cost
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Sentiment
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderTableContent()}</TableBody>
          </Table>
        </div>
      </Card>

      <Card className="bg-white dark:bg-zinc-800/50">
        <div className="flex flex-col items-center justify-between p-4 sm:flex-row">
          <div className="mb-4 flex items-center space-x-2 sm:mb-0">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
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
              disabled={paginationKeys.length === 0 || isLoading || isFetching}
              className="p-4"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="p-4"
              size="lg"
              onClick={handleNextPage}
              disabled={calls.length < rowsPerPage || isLoading || isFetching}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

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
