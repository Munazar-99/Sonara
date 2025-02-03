/** Data types for production metrics */

import { PhoneCallResponse } from "retell-sdk/resources/index.mjs";

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
  id: string;
  dateTime: number;
  start: number;
  end: number;
  direction: string;
  callerId: string;
  duration: number;
  recordingUrl: string;
  cost: number;
  sentiment?: string;
  transcriptObject: PhoneCallResponse['transcript_object'];
  outcome: boolean;
  summary: string;
  disconnectionReason?: string;
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