import React from 'react';
import { Phone, ArrowUpRight, Clock, Package } from 'lucide-react';

const metrics = [
  {
    title: 'Total Calls',
    value: '1,234',
    trend: '+2.5% from previous week',
    trendUp: true,
    icon: Phone,
    iconColor: 'text-blue-500 dark:text-blue-400',
  },
  {
    title: 'Success Rate',
    value: '92.4%',
    trend: '-0.3% from previous week',
    trendUp: false,
    icon: ArrowUpRight,
    iconColor: 'text-indigo-500 dark:text-indigo-400',
  },
  {
    title: 'Avg Duration',
    value: '4m 12s',
    trend: '1 minute faster than last week',
    trendUp: true,
    icon: Clock,
    iconColor: 'text-cyan-500 dark:text-cyan-400',
  },
  {
    title: 'Package Usage',
    value: 'Premium',
    trend: null,
    trendUp: null,
    icon: Package,
    iconColor: 'text-indigo-500 dark:text-indigo-500',
    isPackage: true,
    usage: {
      current: 180,
      total: 500,
      percentage: 36,
    },
  },
];

export function AccountOverview() {
  return (
    <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(metric => (
        <div
          key={metric.title}
          className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg dark:bg-zinc-800"
        >
          <div className="mb-2 flex items-start justify-between">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {metric.title}
            </p>
            <metric.icon className={`h-5 w-5 ${metric.iconColor}`} />
          </div>
          <p className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
            {metric.value}
          </p>
          {metric.isPackage ? (
            <div className="space-y-2">
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-full rounded-full bg-indigo-500 dark:bg-indigo-400"
                  style={{ width: `${metric.usage.percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {metric.usage.current} / {metric.usage.total} minutes used
              </p>
            </div>
          ) : (
            <p
              className={`text-sm ${
                metric.trendUp === null
                  ? 'text-gray-600 dark:text-gray-300'
                  : metric.trendUp
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {metric.trend}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
