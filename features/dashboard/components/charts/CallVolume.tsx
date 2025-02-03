'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTheme } from 'next-themes';
import { BarChart3 } from 'lucide-react';
import { EmptyState } from '../EmptyState';

export default function CallVolumeChart({
  chartData,
}: {
  chartData: { name: string; inbound: number }[];
}) {
  const { theme } = useTheme();
  const hasData = chartData.some(data => data.inbound > 0);

  return (
    <Card className="h-full bg-white dark:bg-zinc-800">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-semibold">Call Volume</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[400px] items-center justify-center pt-6">
        {hasData ? (
          <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={theme === 'dark' ? '#374151' : '#e5e7eb'}
                />
                <XAxis
                  dataKey="name"
                  stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
                />
                <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                    borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                  }}
                />
                <Legend />

                <Area
                  type="monotone"
                  dataKey="inbound"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <EmptyState
            icon={BarChart3}
            title="No call data available"
            description="Call volume data will appear here once calls are made."
          />
        )}
      </CardContent>
    </Card>
  );
}
