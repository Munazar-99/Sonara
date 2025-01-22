'use server';

import { retellClient } from '@/lib/retell/retell';
import { PhoneCallResponse } from 'retell-sdk/resources/index.mjs';

export async function getInitialCallsAction({
  limit,
}: {
  limit: number;
}): Promise<PhoneCallResponse[]> {
  try {
    const response = (await retellClient.call.list({
      filter_criteria: { call_type: ['phone_call'] as const },
      limit,
      sort_order: 'descending',
    })) as PhoneCallResponse[];
    return response;
  } catch (error) {
    console.error('Error fetching initial calls:', error);
    throw new Error('Failed to fetch initial calls');
  }
}
