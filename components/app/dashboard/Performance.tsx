'use client';

import { motion } from 'motion/react';
import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const data = [
  { name: 'Mon', performance: 20 },
  { name: 'Tue', performance: 40 },
  { name: 'Wed', performance: 30 },
  { name: 'Thu', performance: 50 },
  { name: 'Fri', performance: 45 },
  { name: 'Sat', performance: 25 },
  { name: 'Sun', performance: 15 },
];

export function Performance() {
  return (
    <motion.div
      className="rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-800 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl">
        Weekly Performance
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
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: 'Day of Week',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: 'Performance Score',
                angle: -90,
                position: 'insideLeft',
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
              dataKey="performance"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
