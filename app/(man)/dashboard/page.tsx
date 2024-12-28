import { ContentLayout } from '@/components/app/admin-panel/content-layout';
import DashboardContent from '@/components/app/dashboard/DashboardContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | LexAI',
  description:
    'LexAI dashboard with real-time analytics and call center metrics',
};

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <DashboardContent />
    </ContentLayout>
  );
}
