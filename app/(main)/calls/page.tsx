import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import CallHeader from '@/components/main/calls/CallHeader';
import { CallLogTable } from '@/components/main/calls/CallLogTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Call Log | LexAI',
  description: 'View and manage your call history',
};

export default function CallLogPage() {
  return (
    <ContentLayout title="Call Log">
      <div className="mx-auto max-w-7xl px-2 py-6 sm:py-8">
        <CallHeader
          heading="Call Log"
          text="View and manage your conversation history"
        />
        <div className="mt-8">
          <CallLogTable />
        </div>
      </div>
    </ContentLayout>
  );
}
