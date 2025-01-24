'use client';

import React from 'react';
import { BookingCalendar } from './BookingCalendar';
import { BookingStats } from './BookingStats';

export default function BookingsContent() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Bookings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your appointments and schedule.
        </p>
      </div>
      <BookingStats />
      <div className="mt-8">
        <BookingCalendar />
      </div>
    </div>
  );
}
