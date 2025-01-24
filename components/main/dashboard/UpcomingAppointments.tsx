import React from 'react';
import { Calendar } from 'lucide-react';

const appointments = [
  {
    id: 1,
    date: 'Jun 26',
    time: '10:00 AM',
    clientName: 'Alice Johnson',
    service: 'Consultation',
  },
  {
    id: 2,
    date: 'Jun 27',
    time: '2:30 PM',
    clientName: 'Bob Smith',
    service: 'Follow-up',
  },
  {
    id: 3,
    date: 'Jun 28',
    time: '11:15 AM',
    clientName: 'Carol Williams',
    service: 'Initial Assessment',
  },
  {
    id: 4,
    date: 'Jun 29',
    time: '3:00 PM',
    clientName: 'David Brown',
    service: 'Review',
  },
];

export function UpcomingAppointments() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-800 sm:p-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl">
        Upcoming Appointments
      </h2>
      <div className="space-y-4">
        {appointments.map(appointment => (
          <div
            key={appointment.id}
            className="flex items-center rounded-lg bg-gray-50 p-3 dark:bg-zinc-700 sm:p-4"
          >
            <div className="mr-3 rounded-full bg-indigo-500 p-2 sm:mr-4">
              <Calendar className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800 dark:text-white sm:text-base">
                {appointment.clientName}
              </p>
              <p className="truncate text-xs text-gray-600 dark:text-gray-300 sm:text-sm">
                {appointment.service}
              </p>
            </div>
            <div className="ml-2 text-right">
              <p className="text-sm font-medium text-gray-800 dark:text-white sm:text-base">
                {appointment.date}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                {appointment.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
