/** Data types for production metrics */

import { PhoneCallResponse } from 'retell-sdk/resources/index.mjs';

export type ConcurrencyData = {
  maxCalls: number;
  currentCalls: number;
};

export type CallMetrics = {
  concurrency: ConcurrencyData;
  totalCalls: number;
  averageTalkTime: string;
  totalUsage: number;
};

export type ChartDataPoint = {
  name: string;
  inbound: number;
};

export type SentimentDataPoint = {
  name: string;
  value: number;
  color: string;
};

export type DisconnectionDataPoint = {
  name: string;
  value: number;
  color: string;
};

export type RecentCall = {
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
  timeAgo: string;
};

export interface DashboardContentProps {
  success: boolean;
  error?: string;
  data?: {
    metrics: CallMetrics;
    chartData: ChartDataPoint[];
    sentimentData: SentimentDataPoint[];
    disconnectionData: DisconnectionDataPoint[];
    recentCalls: RecentCall[];
  };
}

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string | null;
  trendUp?: boolean | null;
  iconColor: string;
  isPackage?: boolean;
  usage?: {
    current: number;
    total: number;
    percentage: number;
  };
}
