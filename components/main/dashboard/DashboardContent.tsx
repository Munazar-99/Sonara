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
      <div className="space-y-8">
        <AccountOverview />
        <div className="grid gap-4 md:grid-cols-2">
          <CallVolume />
          <Performance />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <RecentActivity />
          <UpcomingAppointments />
        </div>
      </div>
    </DashboardLayout>
  );
}
