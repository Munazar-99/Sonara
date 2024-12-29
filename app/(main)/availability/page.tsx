import { AvailabilitySettings } from '@/components/main/availability/AvailabilitySettings';
import { AvailabilityLayout } from '@/components/main/availability/AvailabilityLayout';
import { Metadata } from 'next';
import { ContentLayout } from '@/components/main/admin-panel/content-layout';

export const metadata: Metadata = {
  title: 'Availability Settings | LexAI',
  description: 'Manage your availability hours and scheduling preferences',
};

export default function AvailabilityPage() {
  return (
    <ContentLayout title="Availability">
      <AvailabilityLayout>
        <AvailabilitySettings />
      </AvailabilityLayout>
    </ContentLayout>
  );
}
