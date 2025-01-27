import { format, subDays, endOfToday, startOfToday } from 'date-fns';

export const formatDuration = (duration: number | undefined) => {
  if (duration === undefined) return 'Missed';
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export const dateRanges: Record<
  string,
  { label: string; days: number; lowerThreshold: number }
> = {
  today: { label: 'Today', days: 0, lowerThreshold: startOfToday().getTime() },
  week: {
    label: 'This Week',
    days: 7,
    lowerThreshold: subDays(endOfToday(), 7).getTime(),
  },
  month: {
    label: 'Last 30 Days',
    days: 30,
    lowerThreshold: subDays(endOfToday(), 30).getTime(),
  },
  quarter: {
    label: 'Last 90 Days',
    days: 90,
    lowerThreshold: subDays(endOfToday(), 90).getTime(),
  },
};

export const formatDate = (dateTime: number) => ({
  date: format(new Date(dateTime), 'MMM d, yyyy'),
  time: format(new Date(dateTime), 'h:mm a'),
});

export const getDisconnectionStatus = (reason: string) => {
  const greenReasons = [
    'user_hangup',
    'agent_hangup',
    'call_transfer',
    'voicemail_reached',
    'inactivity',
  ];

  const redReasons = [
    'machine_detected',
    'max_duration_reached',
    'concurrency_limit_reached',
    'no_valid_payment',
    'scam_detected',
    'error_inbound_webhook',
    'dial_busy',
    'dial_failed',
    'dial_no_answer',
    'error_llm_websocket_open',
    'error_llm_websocket_lost_connection',
    'error_llm_websocket_runtime',
    'error_llm_websocket_corrupt_payload',
    'error_frontend_corrupted_payload',
    'error_twilio',
    'error_no_audio_received',
    'error_asr',
    'error_retell',
    'error_unknown',
    'error_user_not_joined',
    'registered_call_timeout',
  ];

  if (greenReasons.includes(reason)) {
    return 'bg-green-500';
  } else if (redReasons.includes(reason)) {
    return 'bg-red-500';
  } else {
    return 'bg-gray-500'; // Default, in case the reason is unknown
  }
};
