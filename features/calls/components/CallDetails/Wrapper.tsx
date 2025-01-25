import { Call } from '@/features/calls/types';
import dynamic from 'next/dynamic';

const CallDetails = dynamic(() => import('./CallDetails'), {
  ssr: false,
});

export default function DynamicCallDetails({ call }: { call: Call }) {
  return <CallDetails call={call} />;
}
