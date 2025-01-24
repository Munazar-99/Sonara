'use client';

import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const data = [
  { date: '17 Dec', inbound: 6, outbound: 24 },
  { date: '18 Dec', inbound: 8, outbound: 22 },
  { date: '19 Dec', inbound: 10, outbound: 20 },
  { date: '20 Dec', inbound: 12, outbound: 18 },
  { date: '21 Dec', inbound: 14, outbound: 16 },
  { date: '22 Dec', inbound: 16, outbound: 14 },
  { date: '23 Dec', inbound: 18, outbound: 12 },
];

export function CallVolume() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-800 sm:p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl">
        Call Volume
      </h2>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: 'Date',
                position: 'insideBottom',
                offset: -5,
                fill: '#888888',
              }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: 'Number of Calls',
                angle: -90,
                position: 'insideLeft',
                fill: '#888888',
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="inbound"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="outbound"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
            Inbound
          </span>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-3 w-3 rounded-full bg-purple-500"></div>
          <span className="text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
            Outbound
          </span>
        </div>
      </div>
    </div>
  );
}
