import dynamic from 'next/dynamic';
import { getInitialCallsAction } from '../server/get-initial-calls.action';

const CallLogTable = dynamic(() => import('./CallLogTable'), {
  loading: () => <div>Loading table...</div>,
});

export async function CallLogContent() {
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

  return <CallLogTable initialCalls={initialCalls} />;
}
