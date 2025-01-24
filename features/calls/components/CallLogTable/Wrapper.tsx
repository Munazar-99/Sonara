import { Call } from '@/features/calls/types';
import dynamic from 'next/dynamic';
import CallTableFullSkeleton from '../Skeletons/CallTableFullSkeleton';

const CallLogTable = dynamic(() => import('./CallLogTable'), {
  loading: () => <CallTableFullSkeleton />,
});

export default function DynamicCallLogTable({
  initialCalls,
}: {
  initialCalls: Call[];
}) {
  return <CallLogTable initialCalls={initialCalls} />;
}
