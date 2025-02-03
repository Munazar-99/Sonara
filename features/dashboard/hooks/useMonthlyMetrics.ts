import { useQuery } from "@tanstack/react-query";
import { fetchMonthlyCallMetrics } from "@/features/dashboard/server/actions/fetch-calls-by-month";
import { DashboardContentProps } from "../types";

export function useMonthlyMetrics(selectedMonth: number, initialData: DashboardContentProps) {
  return useQuery({
    queryKey: ["monthlyMetrics", selectedMonth],
    queryFn: () => fetchMonthlyCallMetrics(selectedMonth),
    initialData,
    refetchOnMount: false,
  });
}
