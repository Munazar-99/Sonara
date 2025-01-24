import dynamic from 'next/dynamic';
import { CallTablePaginationProps } from './CallTablePagination';

const CallTablePagination = dynamic(() => import('./CallTablePagination'), {});

export default function DynamicCallTablePagination({
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
