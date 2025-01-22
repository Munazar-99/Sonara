import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Call } from '../types';
import { fetchCallsAction } from '../server/fetch-calls.action';
import { dateRanges } from '../utils';

export const useCallData = (initialCalls: Call[]) => {
  const [paginationKeys, setPaginationKeys] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'inbound' | 'outbound' | 'all'>(
    'all',
  );
  const [dateRange, setDateRange] = useState<keyof typeof dateRanges>('month');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const currentPaginationKey = paginationKeys[paginationKeys.length - 1];

  const fetchCallsCallback = useCallback(() => {
    return fetchCallsAction({
      limit: rowsPerPage,
      paginationKey: currentPaginationKey,
      lowerThreshold: dateRanges[dateRange].lowerThreshold,
      direction: filterType === 'all' ? undefined : filterType,
      searchQuery,
    });
  }, [rowsPerPage, currentPaginationKey, dateRange, filterType, searchQuery]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'calls',
      {
        paginationKey: currentPaginationKey,
        limit: rowsPerPage,
        dateRange,
        filterType,
        searchQuery,
      },
    ],
    queryFn: fetchCallsCallback,
    initialData: initialCalls,
    refetchOnMount: false,
  });

  const calls = Array.isArray(data) ? data : [];

  const handleNextPage = () => {
    if (calls.length === rowsPerPage) {
      const lastCall = calls[calls.length - 1];
      setPaginationKeys(prev => [...prev, lastCall.id]);
    }
  };

  const handlePreviousPage = () => {
    setPaginationKeys(prev => prev.slice(0, -1));
  };

  return {
    calls,
    isLoading,
    isFetching,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    dateRange,
    setDateRange,
    rowsPerPage,
    setRowsPerPage,
    handleNextPage,
    handlePreviousPage,
    paginationKeys,
    setPaginationKeys,
  };
};
