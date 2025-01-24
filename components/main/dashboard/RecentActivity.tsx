import React from 'react';
import { Phone, Calendar } from 'lucide-react';

const activities = [
  {
    type: 'call',
    name: 'John Doe',
    time: '2 hours ago',
    duration: '5m 23s',
    status: 'completed',
  },
  {
    type: 'appointment',
    name: 'Jane Smith',
    time: '4 hours ago',
    service: 'Consultation',
    status: 'scheduled',
  },
  {
    type: 'call',
    name: 'Alice Johnson',
    time: 'Yesterday',
    duration: '3m 45s',
    status: 'missed',
  },
  {
    type: 'appointment',
    name: 'Bob Wilson',
    time: 'Yesterday',
    service: 'Follow-up',
    status: 'completed',
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-800 sm:p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center rounded-lg bg-gray-50 p-3 dark:bg-zinc-700 sm:p-4"
          >
            <div
              className={`mr-3 rounded-full p-2 sm:mr-4 ${activity.type === 'call' ? 'bg-blue-500' : 'bg-green-500'}`}
            >
              {activity.type === 'call' ? (
                <Phone className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              ) : (
                <Calendar className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800 dark:text-white sm:text-base">
                {activity.name}
              </p>
              <p className="truncate text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
                {activity.type === 'call'
                  ? `Call duration: ${activity.duration}`
                  : `Service: ${activity.service}`}
              </p>
            </div>
            <div className="ml-2 text-right">
              <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                {activity.time}
              </p>
              <p
                className={`text-xs sm:text-sm ${
                  activity.status === 'completed'
                    ? 'text-green-500 dark:text-green-400'
                    : activity.status === 'missed'
                      ? 'text-red-500 dark:text-red-400'
                      : 'text-yellow-500 dark:text-yellow-400'
                }`}
              >
                {activity.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
