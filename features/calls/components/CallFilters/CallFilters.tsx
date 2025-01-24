import { Filter } from 'lucide-react';
import { dateRanges } from '../../utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface CallFiltersProps {
  dateRange: string;
  setDateRange: (value: string) => void;
  filterType: 'inbound' | 'outbound' | 'all';
  setFilterType: (value: 'inbound' | 'outbound' | 'all') => void;
}

export const CallFilters = ({
  dateRange,
  setDateRange,
  filterType,
  setFilterType,
}: CallFiltersProps) => (
  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
    <Select value={dateRange} onValueChange={setDateRange}>
      <SelectTrigger className="w-full sm:w-[160px]">
        <SelectValue placeholder="Select date range" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(dateRanges).map(([key, { label }]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Select
      value={filterType}
      onValueChange={(value: string) =>
        setFilterType(value as 'inbound' | 'outbound' | 'all')
      }
    >
      <SelectTrigger className="w-full sm:w-[140px]">
        <Filter className="mr-2 h-4 w-4" />
        <SelectValue placeholder="All Types" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Types</SelectItem>
        <SelectItem value="inbound">Inbound</SelectItem>
        <SelectItem value="outbound">Outbound</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default CallFilters;
