'use server';

import { retellClient } from '@/lib/retell/retell';
import { PhoneCallResponse } from 'retell-sdk/resources/index.mjs';
import { Call } from '../types';
import { getCurrentSession } from '@/utils/auth/getCurrentSession';
import { redirect } from 'next/navigation';

export async function getInitialCallsAction({
  limit,
}: {
  limit: number;
}): Promise<{
  success: boolean;
  error?: string;
  data: Call[];
  timestamp: string;
}> {
  const session = await getCurrentSession();
  if (!session) {
    console.log(new Date().toISOString(), 'No session found');
    return redirect('/login');
  }
  let response: PhoneCallResponse[] = [];

  try {
    response = (await retellClient.call.list({
      filter_criteria: { call_type: ['phone_call'] as const },
      limit,
      sort_order: 'descending',
    })) as PhoneCallResponse[];
  } catch (error) {
    console.error('Error fetching initial calls:', error);
    return {
      success: false,
      error: 'Failed to fetch initial calls',
      data: [],
      timestamp: new Date().toISOString(),
    };
  }
  const formattedCalls = response.map(call => ({
    id: call.call_id,
    dateTime: call.start_timestamp ?? 0,
    start: call.start_timestamp ?? 0,
    end: call.end_timestamp ?? 0,
    direction: call.direction,
    callerId: call.from_number,
    duration: call.call_cost?.total_duration_seconds ?? 0,
    recordingUrl: call.recording_url,
    cost: (call.call_cost?.combined_cost ?? 0) / 100,
    sentiment: call.call_analysis?.user_sentiment,
    transcriptObject: call.transcript_object ?? [],
    outcome: call.call_analysis?.call_successful ?? false,
    summary: call.call_analysis?.call_summary ?? '',
    disconnectionReason: call.disconnection_reason,
  }));
  return {
    success: true,
    data: formattedCalls,
    timestamp: new Date().toISOString(),
  };
}
