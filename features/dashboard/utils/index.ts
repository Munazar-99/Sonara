import { Users, PhoneCall, Clock, BarChart } from 'lucide-react';
import { CallMetrics, ChartDataPoint, StatCardProps } from '../types';

/**
 * Returns the start and end timestamps (in ms) for the given month.
 *
 * @param selectedMonth - The month for which to generate the range (1-12)
 * @returns An object containing startOfMonth and endOfMonth timestamps.
 */
export function getMonthRange(selectedMonth: number): {
  startOfMonth: number;
  endOfMonth: number;
} {
  const now = new Date();
  const year = now.getFullYear();
  const startOfMonth = new Date(year, selectedMonth - 1, 1).getTime();
  const endOfMonth = new Date(
    year,
    selectedMonth,
    0,
    23,
    59,
    59,
    999,
  ).getTime();
  return { startOfMonth, endOfMonth };
}

/**
 * Formats a duration (in seconds) into a human-readable string (e.g., "3m 20s").
 *
 * @param seconds - The duration in seconds.
 * @returns A formatted string representing the duration.
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds <= 0) return '0m 0s';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.ceil(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Returns a human-readable "time ago" string given a timestamp.
 *
 * @param timestamp - The past timestamp.
 * @param now - (Optional) The current timestamp in ms.
 * @returns A string like "5 mins ago" or "2 hrs ago".
 */
export function formatTimeAgo(
  timestamp: number,
  now: number = Date.now(),
): string {
  const elapsed = Math.floor((now - timestamp) / 1000);
  if (elapsed < 60) return `${elapsed} seconds ago`;
  if (elapsed < 3600) return `${Math.floor(elapsed / 60)} mins ago`;
  if (elapsed < 86400) return `${Math.floor(elapsed / 3600)} hrs ago`;
  return `${Math.floor(elapsed / 86400)} days ago`;
}

/**
 * Generates chart data from daily call counts.
 *
 * @param dailyMetrics - A Map of day-of-month to call count.
 * @returns An array of chart data points.
 */
export function generateChartData(
  dailyMetrics: Map<number, number>,
): ChartDataPoint[] {
  // Sort days by call count (descending)
  const sortedDays = Array.from(dailyMetrics.entries()).sort(
    (a, b) => b[1] - a[1],
  );
  // Top 3 days with the highest call volumes.
  const topDays = sortedDays
    .slice(0, 3)
    .map(([day, count]) => ({ name: `${day}`, inbound: count }));
  // Evenly distribute remaining days.
  const remainingDays = evenlyDistributeDays(
    dailyMetrics,
    topDays.map(d => parseInt(d.name, 10)),
  );
  // Return the combined data sorted by day number (ascending).
  return [...topDays, ...remainingDays].sort(
    (a, b) => parseInt(a.name, 10) - parseInt(b.name, 10),
  );
}

/**
 * Evenly selects days from the daily metrics excluding provided days.
 *
 * @param dailyMetrics - A Map of day-of-month to call count.
 * @param excludeDays - An array of day numbers to exclude.
 * @returns An array of chart data points for the available days.
 */
function evenlyDistributeDays(
  dailyMetrics: Map<number, number>,
  excludeDays: number[],
): ChartDataPoint[] {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const availableDays = daysInMonth.filter(
    day => !excludeDays.includes(day) && dailyMetrics.has(day),
  );
  const step = Math.max(Math.floor(availableDays.length / 4), 1);
  return availableDays
    .filter((_, index) => index % step === 0)
    .map(day => ({ name: `${day}`, inbound: dailyMetrics.get(day) ?? 0 }));
}

// **Pure Function**: Generates metrics data (Prevents re-renders)
export const getMetrics = (metrics: CallMetrics): StatCardProps[] => [
  {
    title: "Live AI Agents",
    value: `${metrics.concurrency.currentCalls} / ${metrics.concurrency.maxCalls}`,
    icon: Users,
    trend: "+2.5% from previous week",
    trendUp: true,
    iconColor: "text-blue-500 dark:text-blue-400",
  },
  {
    title: "Total Calls",
    value: `${metrics.totalCalls}`,
    icon: PhoneCall,
    trend: "-0.3% from previous week",
    trendUp: false,
    iconColor: "text-indigo-500 dark:text-indigo-400",
  },
  {
    title: "Average Talk Time",
    value: metrics.averageTalkTime,
    icon: Clock,
    trend: "1 minute faster than last week",
    trendUp: true,
    iconColor: "text-cyan-500 dark:text-cyan-400",
  },
  {
    title: "Total Usage",
    value: `${metrics.totalUsage} min`,
    icon: BarChart,
    trend: null,
    trendUp: null,
    iconColor: "text-indigo-500 dark:text-indigo-500",
    isPackage: true,
    usage: {
      current: 180,
      total: 500,
      percentage: 36,
    },
  },
];
