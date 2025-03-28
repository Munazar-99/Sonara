import { getInitialCallsAction } from '../server/actions/get-initial-calls.action';
import CallLogTable from './CallLogTable';

export async function CallLogContent() {
  const response = await getInitialCallsAction({ limit: 10 });
  return <CallLogTable initialCalls={response.success ? response.data : []} />;
}
