import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import DashboardContent from '@/components/main/dashboard/DashboardContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | LexAI',
  description:
    'LexAI dashboard with real-time analytics and call center metrics',
};

export default async function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <DashboardContent />
    </ContentLayout>
  );
}
