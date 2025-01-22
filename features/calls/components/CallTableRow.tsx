import { TableCell, TableRow } from '@/components/ui/table';
import {
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  DollarSign,
  SmilePlus,
  Frown,
  Meh,
} from 'lucide-react';
import { Call } from '../types';
import { formatDate, formatDuration } from '../utils';

interface CallTableRowProps {
  call: Call;
  onClick: () => void;
}

export const CallTableRow = ({ call, onClick }: CallTableRowProps) => {
  const { date, time } = formatDate(call.dateTime);

  return (
    <TableRow
      className="cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
      onClick={onClick}
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
          <span>{date}</span>
          <span className="text-sm text-muted-foreground">{time}</span>
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
  );
};
