import dynamic from 'next/dynamic';
import SkeletonRow from '../Skeletons/SkeletonRow';
import { CallTableContentProps } from '../CallTableContent/CallTableContent';

const CallTableContent = dynamic(
  () => import('../CallTableContent/CallTableContent'),
  {
    ssr: false,
    loading: () => <SkeletonRow rows={10} />,
  },
);

export default function DynamicCallTableContent({
  calls,
  isLoading,
  isFetching,
  rowsPerPage,
  searchQuery,
  filterType,
  dateRange,
  onCallSelect,
}: CallTableContentProps) {
  return (
    <CallTableContent
      {...{
        calls,
        isLoading,
        isFetching,
        rowsPerPage,
        searchQuery,
        filterType,
        dateRange,
        onCallSelect,
      }}
    />
  );
}
