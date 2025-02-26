import React from 'react';
import { SmilePlus, Meh, Frown, DollarSign, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Call } from '../../types';
import { formatDuration, getDisconnectionStatus } from '../../utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CallAnalysisProps {
  call: Call;
}

const CallAnalysis: React.FC<CallAnalysisProps> = ({ call }) => {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-8 p-6">
        <section className="">
          <h2 className="text-2xl font-semibold">Call Information</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span>{formatDuration(call.duration)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Usage</span>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{call.cost.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Started at</span>
              <span>{new Date(call.start!).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ended at</span>
              <span>{new Date(call.end!).toLocaleString()}</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Call Analysis</h2>
          <div className="mt-6 w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-48 text-muted-foreground">Call sentiment</span>
              <div className="flex w-[28%] items-center space-x-2">
                {call.sentiment === 'Positive' ? (
                  <SmilePlus className="h-5 w-5 text-green-500" />
                ) : call.sentiment === 'Neutral' ? (
                  <Meh className="h-5 w-5 text-yellow" />
                ) : (
                  <Frown className="h-5 w-5 text-red-500" />
                )}
                <span className="capitalize">{call.sentiment}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Call status</span>
              <div className="flex w-[28%] items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Call Completed</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="w-48 text-muted-foreground">
                End call reason
              </span>
              <div className="flex w-[28%] items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${getDisconnectionStatus(call.disconnectionReason!)}`}
                />
                <span>
                  {call.disconnectionReason
                    ?.replace(/_/g, ' ') // Replace underscores with spaces
                    .replace(/\b\w/g, char => char.toUpperCase())}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-muted-foreground">Task status</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="ml-1 h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      className="bg-foreground dark:bg-gray-dark"
                    >
                      <p className="bg-foreground text-sm dark:bg-gray-dark">
                        Indicates whether the task discussed in the conversation
                        was completed and resolved.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex w-[28%] items-center">
                <Badge
                  variant="default"
                  className={` ${call.outcome ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} `}
                >
                  {call.outcome ? 'Complete' : 'Incomplete'}
                </Badge>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};

export default CallAnalysis;
