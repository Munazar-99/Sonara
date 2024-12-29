'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function AvailabilityLayout({ children }: DashboardLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-5xl px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Availability
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Set your available hours and manage when you can be booked.
        </p>
      </div>
      {children}
    </motion.div>
  );
}
