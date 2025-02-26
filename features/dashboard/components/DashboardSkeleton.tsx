import { Skeleton } from '@/components/ui/skeleton';
import { DashboardLayout } from './DashboardLayout';
import { Card } from '@/components/ui/card';

export default function DashboardSkeleton() {
  return (
    <DashboardLayout>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Monitor your call center performance and metrics
            </p>
          </div>
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bg-white dark:bg-gray-dark">
              <Skeleton className="h-24" />
            </Card>
          ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="bg-white dark:bg-gray-dark lg:col-span-2">
            <Skeleton className="h-[400px]" />
          </Card>
          <Card className="bg-white dark:bg-gray-dark">
            <Skeleton className="h-[400px]" />
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="bg-white dark:bg-gray-dark">
            <Skeleton className="h-[470px]" />
          </Card>
          <Card className="bg-white dark:bg-gray-dark lg:col-span-2">
            <Skeleton className="h-[470px]" />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
