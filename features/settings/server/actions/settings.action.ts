'use server';

import { retellClient } from '@/lib/retell/retell';
import { getCurrentUser } from '@/utils/auth/getCurrentUser';
import { redirect } from 'next/navigation';
import { VoiceResponse } from 'retell-sdk/resources/voice.mjs';

/**
 * Fetches the authenticated user or redirects to login if not found.
 */
async function fetchUser(): Promise<{ email: string; name: string }> {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return {
    email: user.email,
    name: user.name,
  };
}

/**
 * Fetches voices from the Retell API, filtering only ElevenLabs voices.
 */
async function fetchVoices(): Promise<VoiceResponse[]> {
  try {
    const voiceResponses = await retellClient.voice.list();
    return voiceResponses.filter(voice => voice.provider === 'elevenlabs');
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
}

/**
 * Handles fetching settings-related data.
 */
export async function settingsAction() {
  try {
    const [user, voices] = await Promise.all([fetchUser(), fetchVoices()]);
    return { user, voices };
  } catch (error) {
    console.error('Error in settingsAction:', error);
    return {
      user: { email: 'error@example.com', name: 'Error User' },
      voices: [],
    };
  }
}
