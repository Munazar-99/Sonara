import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { PhoneOff } from "lucide-react"
import { EmptyState } from "../EmptyState"

interface ChartCardProps {
  title: string
  data: {
    name: string
    value: number
    color: string
  }[]
}

export default function Disconnection({ title, data }: ChartCardProps) {
  const hasData = data.some((item) => item.value > 0)

  return (
    <Card className="bg-white dark:bg-zinc-800 h-full">
      <CardHeader className="border-b ">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 h-[470px] flex flex-col justify-center">
        {hasData ? (
          <>
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div
                            className={`rounded border border-gray-100 bg-white p-2 text-sm shadow-md dark:border-gray-700 dark:bg-gray-800`}
                          >
                            <p className="font-semibold">{data.name}</p>
                            <p>{data.value}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {data.map((entry) => (
                <div
                  key={entry.name}
                  className="flex items-center justify-between rounded-md p-1 transition-colors hover:bg-black/5"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: entry.color,
                      }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <span className="text-sm font-medium">{entry.value}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={PhoneOff}
            title="No disconnection data"
            description="Call disconnection statistics will appear here once calls are made."
          />
        )}
      </CardContent>
    </Card>
  )
}

