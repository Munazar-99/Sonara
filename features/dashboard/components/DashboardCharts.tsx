import { memo } from 'react';

import RecentActivity from './RecentActivity';
import {
  ChartDataPoint,
  SentimentDataPoint,
  DisconnectionDataPoint,
  RecentCall,
} from '../types';
import dynamic from 'next/dynamic';

// import dynamically
const DynamicCallVolumeChart = dynamic(() => import('./charts/CallVolume'), {
  ssr: false
});
const DynamicSentimentChart = dynamic(() => import('./charts/Sentiment'), {
  ssr: false
});
const DynamicDisconnection = dynamic(() => import('./charts/Disconnection'), {
  ssr: false
});

interface DashboardChartsProps {
  chartData: ChartDataPoint[];
  sentimentData: SentimentDataPoint[];
  disconnectionData: DisconnectionDataPoint[];
  recentCalls: RecentCall[];
}

export const DashboardCharts = memo(
  ({
    chartData,
    sentimentData,
    disconnectionData,
    recentCalls,
  }: DashboardChartsProps) => {
    return (
      <div className="mt-4 grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-full lg:col-span-2">
            <DynamicCallVolumeChart chartData={chartData} />
          </div>
          <div className="h-full">
            <DynamicSentimentChart title="Sentiment Analysis" data={sentimentData} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-full">
            <DynamicDisconnection
              title="Disconnection Reason"
              data={disconnectionData}
            />
          </div>
          <div className="h-full lg:col-span-2">
            <RecentActivity data={recentCalls} />
          </div>
        </div>
      </div>
    );
  },
);

DashboardCharts.displayName = 'DashboardCharts';

export default DashboardCharts;
