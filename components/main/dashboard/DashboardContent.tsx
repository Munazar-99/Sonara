'use client';

import { AccountOverview } from './AccountOverview';
import { CallVolume } from './CallVolume';
import { DashboardLayout } from './DashboardLayout';
import { RecentActivity } from './RecentActivity';
import { UpcomingAppointments } from './UpcomingAppointments';
import { Performance } from './Performance';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AccountOverview />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CallVolume />
        <Performance />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentActivity />
        <UpcomingAppointments />
      </div>
    </DashboardLayout>
  );
}
