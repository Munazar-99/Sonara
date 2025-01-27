'use server';

import { retellClient } from '@/lib/retell/retell';
import { PhoneCallResponse } from 'retell-sdk/resources/index.mjs';
import { Call } from '../types';

export async function getInitialCallsAction({
  limit,
}: {
  limit: number;
}): Promise<Call[]> {
  try {
    const response = (await retellClient.call.list({
      filter_criteria: { call_type: ['phone_call'] as const },
      limit,
      sort_order: 'descending',
    })) as PhoneCallResponse[];
    return response.map(call => ({
      id: call.call_id,
      dateTime: call.start_timestamp ?? 0,
      start: call.start_timestamp ?? 0,
      end: call.end_timestamp ?? 0,
      direction: call.direction,
      callerId: call.from_number,
      duration: call.call_cost?.total_duration_seconds ?? 0,
      recordingUrl: call.recording_url, // Fallback to an empty string
      cost: call.call_cost?.combined_cost
        ? call.call_cost.combined_cost / 100
        : 0,
      sentiment: call.call_analysis?.user_sentiment,
      transcriptObject: call.transcript_object ?? [],
      outcome: call.call_analysis?.call_successful ?? false,
      summary: call.call_analysis?.call_summary ?? '',
      disconnectionReason: call.disconnection_reason,
    }));
  } catch (error) {
    console.error('Error fetching initial calls:', error);
    throw new Error('Failed to fetch initial calls');
  }
}
