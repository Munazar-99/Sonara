'use server';

import {
  CallListParams,
  PhoneCallResponse,
} from 'retell-sdk/resources/call.mjs';
import { retellClient } from '@/lib/retell/retell';
import { Call } from '../types';

export async function fetchCallsAction({
  limit,
  paginationKey,
  lowerThreshold,
  direction,
  searchQuery,
}: {
  limit: number;
  paginationKey?: string;
  lowerThreshold: number;
  direction?: 'inbound' | 'outbound';
  searchQuery?: string;
}): Promise<Call[]> {
  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    throw new Error(
      'RETELL_API_KEY is not defined in the environment variables.',
    );
  }

  const todayTimestamp = new Date().getTime();

  const filterCriteria: CallListParams.FilterCriteria = {
    call_type: ['phone_call'],
    direction: direction ? [direction] : undefined,
    start_timestamp: {
      upper_threshold: todayTimestamp,
      lower_threshold: lowerThreshold,
    },
    ...(searchQuery ? { from_number: [searchQuery] } : {}),
  };

  const response = (await retellClient.call.list({
    limit,
    pagination_key: paginationKey,
    sort_order: 'descending',
    filter_criteria: filterCriteria,
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
}
