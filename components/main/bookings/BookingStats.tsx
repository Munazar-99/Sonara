'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  {
    label: 'Total Bookings',
    value: '156',
    change: '+12.5%',
    icon: Calendar,
    color: 'text-blue-500',
  },
  {
    label: 'Average Duration',
    value: '45m',
    change: '-5m from last month',
    icon: Clock,
    color: 'text-emerald-500',
  },
  {
    label: 'Unique Clients',
    value: '89',
    change: '+24 this month',
    icon: Users,
    color: 'text-purple-500',
  },
  {
    label: 'Completion Rate',
    value: '97%',
    change: '+2.3%',
    icon: CheckCircle,
    color: 'text-indigo-500',
  },
];

export function BookingStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden border-border bg-background dark:bg-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`rounded-full p-3 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
