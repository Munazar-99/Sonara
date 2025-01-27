import { PhoneCallResponse } from 'retell-sdk/resources/index.mjs';

export interface Call {
  id: PhoneCallResponse['call_id'];
  dateTime: PhoneCallResponse['start_timestamp'];
  start: PhoneCallResponse['start_timestamp'];
  end: PhoneCallResponse['end_timestamp'];
  direction: PhoneCallResponse['direction'];
  callerId: PhoneCallResponse['from_number'];
  duration: NonNullable<
    PhoneCallResponse['call_cost']
  >['total_duration_seconds'];
  recordingUrl: PhoneCallResponse['recording_url'];
  cost: number;
  sentiment: NonNullable<PhoneCallResponse['call_analysis']>['user_sentiment']; // Ensure call_analysis is not undefined
  transcriptObject: PhoneCallResponse['transcript_object'];
  outcome: NonNullable<PhoneCallResponse['call_analysis']>['call_successful'];
  summary: NonNullable<PhoneCallResponse['call_analysis']>['call_summary'];
  disconnectionReason: PhoneCallResponse['disconnection_reason'];
}
