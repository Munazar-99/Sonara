import { memo } from 'react';
import {
  ChartDataPoint,
  SentimentDataPoint,
  DisconnectionDataPoint,
  RecentCall,
} from '../types';
import CallVolumeChart from './charts/CallVolume';
import Disconnection from './charts/Disconnection';
import SentimentChart from './charts/Sentiment';
import RecentActivity from './RecentActivity';

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
            <CallVolumeChart chartData={chartData} />
          </div>
          <div className="h-full">
            <SentimentChart title="Sentiment Analysis" data={sentimentData} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-full">
            <Disconnection
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
