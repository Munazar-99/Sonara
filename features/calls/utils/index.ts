import { format, subDays, endOfToday, startOfToday } from 'date-fns';

export const formatDuration = (duration: number | undefined) => {
  if (duration === undefined) return 'Missed';
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const dateRanges: Record<
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

export const formatDate = (dateTime: number) => ({
  date: format(new Date(dateTime), 'MMM d, yyyy'),
  time: format(new Date(dateTime), 'h:mm a'),
});
