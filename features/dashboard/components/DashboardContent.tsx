'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from './DashboardLayout';
import DashboardSkeleton from './DashboardSkeleton';
import { DashboardHeader } from './DashboardHeader';
import { DashboardContentProps } from '../types';
import { useMonthlyMetrics } from '../hooks/useMonthlyMetrics';
import dynamic from 'next/dynamic';

const DynamicDashboardCharts = dynamic(() => import('./DashboardCharts'), {
  ssr: false,
});
const DynamicDashboardCards = dynamic(() => import('./DashboardCards'), {
  ssr: false,
});

export default function DashboardContent({
  monthData,
}: {
  monthData: DashboardContentProps;
}) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Using the custom hook for data fetching
  const { data, isLoading, isError, isFetching } = useMonthlyMetrics(
    selectedMonth,
    monthData,
  );

  // Memoized function to prevent unnecessary re-renders
  const handleMonthChange = useCallback(
    (month: number) => setSelectedMonth(month),
    [],
  );

  if (isLoading || isFetching) return <DashboardSkeleton />;
  if (isError || !data?.success || !data.data)
    return (
      <p className="text-red-500">Error loading data. Please try again.</p>
    );

  return (
    <DashboardLayout>
      <DashboardHeader
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      <DynamicDashboardCards metrics={data.data?.metrics} />
      <DynamicDashboardCharts
        chartData={data.data.chartData}
        sentimentData={data.data.sentimentData}
        disconnectionData={data.data.disconnectionData}
        recentCalls={data.data.recentCalls}
      />
    </DashboardLayout>
  );
}
