import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import DashboardPage from '@/features/dashboard/components/DashboardPage';
import DashboardSkeleton from '@/features/dashboard/components/DashboardSkeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard | LexAI',
  description:
    'LexAI dashboard with real-time analytics and call center metrics',
};

export default async function Page() {

  return (
    <ContentLayout title="Dashboard">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardPage  />
      </Suspense>
    </ContentLayout>
  );
}
