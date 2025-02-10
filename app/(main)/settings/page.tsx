import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import ProfileSettingsSkeleton from '@/features/settings/components/ProfileSettingsSkeleton';
import Settingspage from '@/features/settings/components/Settingspage';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Settings | LexAI',
  description: 'Manage your account settings and preferences',
};

export default async function Settings() {
  return (
    <ContentLayout title="Settings">
      <Suspense fallback={<ProfileSettingsSkeleton />}>
        <Settingspage />
      </Suspense>
    </ContentLayout>
  );
}
