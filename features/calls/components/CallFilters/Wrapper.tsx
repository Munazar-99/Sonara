import dynamic from 'next/dynamic';
import { CallFiltersProps } from './CallFilters';

const CallFilters = dynamic(() => import('./CallFilters'));

export default function DynamicCallFilters({
  dateRange,
  setDateRange,
  filterType,
  setFilterType,
}: CallFiltersProps) {
  return (
    <CallFilters {...{ dateRange, setDateRange, filterType, setFilterType }} />
  );
}
