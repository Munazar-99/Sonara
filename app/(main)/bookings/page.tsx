import { Metadata } from 'next';
import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import BookingsContent from '@/components/main/bookings/BookingsContent';

export const metadata: Metadata = {
  title: 'Bookings | LexAI',
  description: 'View and manage your upcoming bookings',
};

export default function BookingsPage() {
  return (
    <ContentLayout title="Bookings">
      <BookingsContent />
    </ContentLayout>
  );
}
