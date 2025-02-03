import { Skeleton } from "@/components/ui/skeleton"
import { DashboardLayout } from "./DashboardLayout"
import { Card } from "@/components/ui/card"

export default function DashboardSkeleton() {
  return (
    <DashboardLayout>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Monitor your call center performance and metrics</p>
        </div>
          <Skeleton className="h-10 w-[180px] bg-gray-200 dark:bg-zinc-800" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="bg-white dark:bg-zinc-800">
              <Skeleton className="h-24 bg-gray-100 dark:bg-zinc-700" />
            </Card>
          ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white dark:bg-zinc-800">
            <Skeleton className="h-[400px] bg-gray-100 dark:bg-zinc-700" />
          </Card>
          <Card className="bg-white dark:bg-zinc-800">
            <Skeleton className="h-[400px] bg-gray-100 dark:bg-zinc-700" />
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-zinc-800">
            <Skeleton className="h-[470px] bg-gray-100 dark:bg-zinc-700" />
          </Card>
          <Card className="lg:col-span-2 bg-white dark:bg-zinc-800">
            <Skeleton className="h-[470px] bg-gray-100 dark:bg-zinc-700" />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

