import { memo } from "react";
import { MonthSelect } from "./MonthSelect";

interface DashboardHeaderProps {
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export const DashboardHeader = memo(({ selectedMonth, onMonthChange }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Monitor your call center performance and metrics</p>
        </div>
        <MonthSelect value={selectedMonth.toString()} onValueChange={(val) => onMonthChange(Number(val))} />
      </div>
    </div>
  );
});

DashboardHeader.displayName = "DashboardHeader";