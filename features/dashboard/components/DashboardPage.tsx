import React from 'react';
import { fetchMonthlyCallMetrics } from '../server/actions/fetch-calls-by-month';
import DashboardContent from './DashboardContent';


async function DashboardPage() {
  const response = await fetchMonthlyCallMetrics(new Date().getMonth() + 1);
  return <DashboardContent monthData={response} />;
}

export default DashboardPage;
