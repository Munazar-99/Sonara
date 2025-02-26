import { memo, useMemo } from 'react';
import { CallMetrics } from '../types';
import { getMetrics } from '../utils';

interface DashboardCardsProps {
  metrics: CallMetrics;
}

export const DashboardCards = memo(({ metrics }: DashboardCardsProps) => {
  const statData = useMemo(() => getMetrics(metrics), [metrics]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statData.map(({ title, value, icon: Icon, iconColor }) => (
          <div
            key={title}
            className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg dark:bg-gray-dark"
          >
            <div className="mb-2 flex items-start justify-between">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {title}
              </p>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <p className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>{' '}
    </div>
  );
});

DashboardCards.displayName = 'DashboardCards';

export default DashboardCards;
