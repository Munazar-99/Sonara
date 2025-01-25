import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import CallHeader from '@/features/calls/components/CallHeader';
import { CallLogContent } from '@/features/calls/components/CallLogContent';
import CallTableFullSkeleton from '@/features/calls/components/Skeletons/CallTableFullSkeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Call Log | LexAI',
  description: 'View and manage your call history',
};

export default async function CallLogPage() {
  return (
    <ContentLayout title="Call Logs">
      <div className="mx-auto max-w-7xl px-2 py-6 sm:py-8">
        <CallHeader
          heading="Call Logs"
          text="View and manage your conversation history"
        />
        <div className="mt-8">
          <Suspense fallback={<CallTableFullSkeleton />}>
            <CallLogContent />
          </Suspense>
        </div>
      </div>
    </ContentLayout>
  );
}
