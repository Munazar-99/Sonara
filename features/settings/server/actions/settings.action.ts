'use server';

import { retellClient } from '@/lib/retell/retell';
import { getCurrentUser } from '@/utils/auth/getCurrentUser';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { VoiceResponse } from 'retell-sdk/resources/voice.mjs';

async function fetchUser(): Promise<{ email: string; name: string }> {
  try {
    const user = await getCurrentUser();
    if (!user) throw redirect('/login');

    return {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { email: 'unknown@example.com', name: 'Unknown User' };
  }
}

async function fetchVoices(): Promise<VoiceResponse[]> {
  try {
    const voiceResponses = await retellClient.voice.list();
    return voiceResponses.filter(voice => voice.provider === 'elevenlabs');
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
}

export async function settingsAction() {
  try {
    const user = await fetchUser();
    const voices = await fetchVoices();

    return { user, voices };
  } catch (error) {
    if (isRedirectError(error)) {
      console.warn('Redirect error occurred: ', error);
      throw error;
    }

    console.error('Error in settingsAction:', error);

    return {
      user: { email: 'error@example.com', name: 'Error User' }, // Ensure correct type
      voices: [],
    };
  }
}
