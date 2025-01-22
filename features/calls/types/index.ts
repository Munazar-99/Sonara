export interface Call {
  id: string;
  dateTime: number;
  direction: 'inbound' | 'outbound';
  callerId: string;
  duration: number | undefined;
  recordingUrl: string;
  cost: number;
  sentiment: string;
}
