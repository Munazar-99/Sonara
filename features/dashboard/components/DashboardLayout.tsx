import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-900/50">
    <main className="container mx-auto space-y-6 px-4 py-8 lg:px-8 lg:py-10 ">{children}</main>
  </div>
  );
}
