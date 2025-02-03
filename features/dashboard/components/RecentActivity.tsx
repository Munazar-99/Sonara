"use client"
import { Phone, FileText, Mic, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from "@/components/ui/sheet"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { EmptyState } from "./EmptyState"
import DynamicCallDetails from "@/features/calls/components/CallDetails/Wrapper"

// Mocking DynamicCallDetails component


// Mocking formatDuration function
const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export default function RecentActivity({ data }: { data: any[] }) {
  if (data.length === 0) {
    return (
      <Card className="bg-white dark:bg-zinc-800 h-full">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <EmptyState
            icon={History}
            title="No recent calls"
            description="Your recent call activity will appear here once calls are made."
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white dark:bg-zinc-800 h-full">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-6 h-[470px] overflow-auto xxs:overflow-hidden">
        <div className="space-y-4">
          {data.map((call) => (
            <div
              key={call.id}
              className="flex flex-wrap items-center justify-center xxs:justify-between p-3 sm:p-4 rounded-lg bg-gray-50 dark:bg-zinc-700/50 hover:bg-gray-100 dark:hover:bg-zinc-700/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-green-500">
                  <Phone className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base dark:text-gray-100">{call.callerId}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDuration(call.duration)} • {call.timeAgo}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto bg-white dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white rounded-md"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Transcript
                  </Button>
                </SheetTrigger>
                <SheetContent
              side="right"
              className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-lg"
            >
              <SheetHeader className="flex-shrink-0 p-6 pb-0">
                <SheetTitle>Call Details</SheetTitle>
                <SheetDescription>
                  View detailed information about the selected call.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-grow overflow-hidden">
                <DynamicCallDetails call={call} />
              </div>
            </SheetContent>
              </Sheet>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto bg-white dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white rounded-md"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Recording
                  </Button>
                </SheetTrigger>
                <SheetContent
              side="right"
              className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-lg"
            >
              <SheetHeader className="flex-shrink-0 p-6 pb-0">
                <SheetTitle>Call Details</SheetTitle>
                <SheetDescription>
                  View detailed information about the selected call.
                </SheetDescription>
              </SheetHeader>
              <div className="flex-grow overflow-hidden">
                <DynamicCallDetails call={call} />
              </div>
            </SheetContent>
              </Sheet>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

