import { getInitialCallsAction } from '../server/get-initial-calls.action';
import CallLogTable from './CallLogTable';

export async function CallLogContent() {
  const initialCalls = await getInitialCallsAction({ limit: 10 });
  return <CallLogTable initialCalls={initialCalls} />;
}
