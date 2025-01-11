'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import {
  format,
  parseISO,
  subDays,
  isWithinInterval,
  startOfToday,
} from 'date-fns';
import { CallDetails } from './CallDetails';

interface Call {
  id: string;
  dateTime: string;
  direction: 'inbound' | 'outbound';
  callerId: string;
  duration: string;
}

const calls: Call[] = [
  {
    id: '1',
    dateTime: '2024-12-30T11:16:00',
    direction: 'inbound',
    callerId: '+353 (852) 418-982',
    duration: '02:49',
  },
  {
    id: '2',
    dateTime: '2024-12-30T11:13:00',
    direction: 'outbound',
    callerId: '+353 (852) 418-982',
    duration: '-',
  },
  {
    id: '3',
    dateTime: '2024-12-26T16:49:00',
    direction: 'outbound',
    callerId: '+353 (852) 418-982',
    duration: '-',
  },
];

const dateRanges = {
  today: { label: 'Today', days: 0 },
  week: { label: 'This Week', days: 7 },
  month: { label: 'Last 30 Days', days: 30 },
  quarter: { label: 'Last 90 Days', days: 90 },
};

export function CallLogTable() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.callerId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || call.direction === filterType;

    const callDate = parseISO(call.dateTime);
    const today = startOfToday();
    const rangeStart = subDays(
      today,
      dateRanges[dateRange as keyof typeof dateRanges].days,
    );
    const matchesDate = isWithinInterval(callDate, {
      start: rangeStart,
      end: today,
    });

    return matchesSearch && matchesType && matchesDate;
  });

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
          <Select value={filterType} onValueChange={setFilterType}>
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
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px]">Date & Time</TableHead>
                <TableHead className="w-[120px]">Direction</TableHead>
                <TableHead className="w-[200px]">Caller ID</TableHead>
                <TableHead className="w-[100px]">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map(call => (
                <TableRow
                  key={call.id}
                  className="cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                  onClick={() => setSelectedCall(call)}
                >
                  <TableCell className="py-4 font-medium">
                    {format(parseISO(call.dateTime), 'MMM d, yyyy, h:mm a')}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="secondary"
                      className={
                        call.direction === 'inbound'
                          ? 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400'
                          : 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400'
                      }
                    >
                      {call.direction}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">{call.callerId}</TableCell>
                  <TableCell className="py-4">{call.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Sheet
        open={selectedCall !== null}
        onOpenChange={() => setSelectedCall(null)}
      >
        <SheetContent side="right" className="w-full p-0 sm:max-w-lg">
          <SheetHeader className="p-4">
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>
          {selectedCall && <CallDetails call={selectedCall} />}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
