'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChartIcon } from 'lucide-react';
import { EmptyState } from '../EmptyState';

const COLORS = {
  Positive: '#22c55e',
  Neutral: '#3b82f6',
  Negative: '#ef4444',
};

interface SentimentChartProps {
  title: string;
  data: {
    name: string;
    value: number;
  }[];
}

export default function SentimentChart({ title, data }: SentimentChartProps) {
  const hasData = data.some(item => item.value > 0);

  return (
    <Card className="h-full bg-white dark:bg-gray-dark">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[400px] flex-col justify-center pt-6">
        {hasData ? (
          <>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="70%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={80}
                    outerRadius={110}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.map(entry => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={COLORS[entry.name as keyof typeof COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-md border bg-white p-2 text-xs shadow">
                            <p className="font-medium">
                              {payload[0].name}: {payload[0].value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {data.map(entry => (
                <div
                  key={entry.name}
                  className="flex items-center justify-between rounded-md p-1 transition-colors hover:bg-black/5"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[entry.name as keyof typeof COLORS],
                      }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <span className="text-sm font-medium">{entry.value}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={PieChartIcon}
            title="No sentiment data"
            description="Sentiment analysis will appear here once calls are processed."
          />
        )}
      </CardContent>
    </Card>
  );
}
