import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Call Log | LexAI',
  description: 'View and manage your call history',
};

// Dynamically import components with loading fallbacks
const CallHeader = dynamic(() => import('@/components/main/calls/CallHeader'), {
  loading: () => <div className="h-20 animate-pulse bg-muted" />,
  ssr: true,
});

const CallLogContent = dynamic(
  () =>
    import('@/features/calls/components/CallLogContent').then(mod => ({
      default: mod.CallLogContent,
    })),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  },
);

export default async function CallLogPage() {
  return (
    <ContentLayout title="Call Logs">
      <div className="mx-auto max-w-7xl px-2 py-6 sm:py-8">
        <Suspense fallback={<div className="h-20 animate-pulse bg-muted" />}>
          <CallHeader
            heading="Call Logs"
            text="View and manage your conversation history"
          />
        </Suspense>
        <div className="mt-8">
          <Suspense fallback={<div>Loading...</div>}>
            <CallLogContent />
          </Suspense>
        </div>
      </div>
    </ContentLayout>
  );
}
