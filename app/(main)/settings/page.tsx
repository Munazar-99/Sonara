import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import { SettingsPage } from '@/components/main/settings/SettingsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | LexAI',
  description: 'Manage your account settings and preferences',
};

export default function Settings() {
  return (
    <ContentLayout title="Account">
      <SettingsPage />
    </ContentLayout>
  );
}
