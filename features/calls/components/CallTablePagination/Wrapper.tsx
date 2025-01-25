import { CallTablePaginationProps } from './CallTablePagination';
import { lazy } from 'react';

const CallTablePagination = lazy(() => import('./CallTablePagination'));

export default function LazyCallTablePagination({
  rowsPerPage,
  setRowsPerPage,
  handlePreviousPage,
  handleNextPage,
  isDisabledPrevious,
  isDisabledNext,
  currentPage,
}: CallTablePaginationProps) {
  return (
    <CallTablePagination
      {...{
        rowsPerPage,
        setRowsPerPage,
        handlePreviousPage,
        handleNextPage,
        isDisabledPrevious,
        isDisabledNext,
        currentPage,
      }}
    />
  );
}
