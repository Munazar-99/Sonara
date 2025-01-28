'use server';

import {
  CallListParams,
  PhoneCallResponse,
} from 'retell-sdk/resources/call.mjs';
import { retellClient } from '@/lib/retell/retell';
import { Call } from '../types';
import { getCurrentSession } from '@/utils/auth/getCurrentSession';
import { redirect } from 'next/navigation';

// TODO:implement logging

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

  let response: PhoneCallResponse[] = [];
  try {
    response = (await retellClient.call.list({
      limit,
      pagination_key: paginationKey,
      sort_order: 'descending',
      filter_criteria: filterCriteria,
    })) as PhoneCallResponse[];
  } catch (error) {
    console.error('Error fetching calls:', error);
    return {
      success: false,
      error: 'Failed to fetch calls',
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

  return {
    success: true,
    data: formattedCalls,
    timestamp: new Date().toISOString(),
  };
}
