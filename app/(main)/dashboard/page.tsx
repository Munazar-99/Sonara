import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import DashboardContent from '@/components/main/dashboard/DashboardContent';
import { getCurrentUser } from '@/utils/auth/getCurrentUser';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard | LexAI',
  description:
    'LexAI dashboard with real-time analytics and call center metrics',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return (
    <ContentLayout title="Dashboard">
      <DashboardContent />
    </ContentLayout>
  );
}
