import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonRowProps {
  rows: number;
}

const SkeletonRow: React.FC<SkeletonRowProps> = ({ rows }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow
          key={`skeleton-${index}`}
          className="cursor-pointer transition-colors dark:hover:bg-zinc-700/50"
        >
          <TableCell className="px-4 py-4">
            <div className="flex items-center justify-start space-x-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-[145px]" />
            </div>
          </TableCell>
          <TableCell className="px-4 py-4">
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </TableCell>
          <TableCell className="px-4 py-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </TableCell>
          <TableCell className="px-4 py-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </TableCell>
          <TableCell className="px-4 py-4">
            <Skeleton className="h-6 w-24" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonRow;
