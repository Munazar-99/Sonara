import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CallTableFullSkeleton() {
  return (
    <>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full flex-1 sm:max-w-md">
          <div className="relative">
            <Skeleton className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input disabled className="w-full pl-9" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Select disabled>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue>
                <Skeleton className="h-4 w-24" />
              </SelectValue>
            </SelectTrigger>
          </Select>
          <Select disabled>
            <SelectTrigger className="w-full sm:w-[140px]">
              <Skeleton className="mr-2 h-4 w-4" />
              <SelectValue>
                <Skeleton className="h-4 w-16" />
              </SelectValue>
            </SelectTrigger>
          </Select>
        </div>
      </div>
      <div className="mt-8">
        <Card className="overflow-hidden bg-white dark:bg-gray-dark">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="min-w-full bg-gray-50 dark:bg-gray-dark/50">
                <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-gray-700">
                  {[
                    'Caller ID',
                    'Date & Time',
                    'Duration',
                    'Cost',
                    'Sentiment',
                  ].map(header => (
                    <TableHead
                      key={header}
                      className="min-w-1/5 w-1/5 px-4 py-3 text-left text-sm font-medium text-muted-foreground"
                    >
                      <Skeleton className="h-4 w-16" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className="min-w-1/5 w-1/5 cursor-pointer border transition-colors dark:hover:bg-zinc-700/50"
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
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </>
  );
}
