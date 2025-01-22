import { ContentLayout } from '@/components/main/admin-panel/content-layout';
import CallHeader from '@/components/main/calls/CallHeader';
import { CallLogTable } from '@/features/calls/components/CallLogTable';
import { getInitialCallsAction } from '@/features/calls/server/get-initial-calls.action';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Call Log | LexAI',
  description: 'View and manage your call history',
};

export default async function CallLogPage() {
  const callResponses = await getInitialCallsAction({ limit: 10 });
  const initialCalls = callResponses.map(call => ({
    id: call.call_id,
    dateTime: call.start_timestamp ?? 0,
    direction: call.direction,
    callerId: call.from_number,
    duration: call.call_cost?.total_duration_seconds ?? 0,
    recordingUrl: call.recording_url ?? '', // Fallback to an empty string
    cost: call.call_cost?.combined_cost
      ? call.call_cost.combined_cost / 100
      : 0,
    sentiment: call.call_analysis?.user_sentiment ?? '',
  }));
  return (
    <ContentLayout title="Call Logs">
      <div className="mx-auto max-w-7xl px-2 py-6 sm:py-8">
        <CallHeader
          heading="Call Logs"
          text="View and manage your conversation history"
        />
        <div className="mt-8">
          <CallLogTable initialCalls={initialCalls} />
        </div>
      </div>
    </ContentLayout>
  );
}
