'use client';

import React, { useMemo } from 'react';
import { Phone, FileText, Mic, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from '@/components/ui/sheet';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { EmptyState } from './EmptyState';
import DynamicCallDetails from '@/features/calls/components/CallDetails/Wrapper';
import { RecentCall } from '../types';
import { formatDuration } from '../utils';

// Component for rendering a single call entry
const CallEntry: React.FC<{ call: RecentCall }> = ({ call }) => (
  <div
    key={call.id}
    className="flex flex-wrap items-center justify-center rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100 dark:bg-sidebar-dark/50 dark:hover:bg-sidebar-dark/80 xxs:justify-between sm:p-4"
  >
    <div className="flex items-center gap-3">
      <div className="rounded-full bg-green-500 p-2">
        <Phone className="h-4 w-4 text-white sm:h-5 sm:w-5" />
      </div>
      <div>
        <p className="text-sm font-medium dark:text-gray-100 sm:text-base">
          {call.callerId}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatDuration(call.duration)} • {call.timeAgo}
        </p>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
      <CallDetailSheet title="Transcript" icon={FileText} call={call} />
      <CallDetailSheet title="Recording" icon={Mic} call={call} />
    </div>
  </div>
);

// Reusable Sheet component for call details
const CallDetailSheet: React.FC<{
  title: string;
  icon: React.ElementType;
  call: RecentCall;
}> = ({ title, icon: Icon, call }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="w-full rounded-md bg-white dark:bg-dark dark:text-gray-300 dark:hover:bg-primary dark:hover:text-white sm:w-auto"
      >
        <Icon className="mr-2 h-4 w-4" />
        {title}
      </Button>
    </SheetTrigger>
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
        <DynamicCallDetails call={call} />
      </div>
    </SheetContent>
  </Sheet>
);

const RecentActivity: React.FC<{ data: RecentCall[] }> = ({ data }) => {
  const hasRecentCalls = useMemo(() => data.length > 0, [data]);

  return (
    <Card className="h-full bg-white dark:bg-gray-dark">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="h-[470px] overflow-auto p-6 xxs:overflow-hidden">
        {hasRecentCalls ? (
          <div className="space-y-4">
            {data.map(call => (
              <CallEntry key={call.id} call={call} />
            ))}
          </div>
        ) : (
          <div className="flex h-[400px] items-center justify-center">
            <EmptyState
              icon={History}
              title="No recent calls"
              description="Your recent call activity will appear here once calls are made."
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
