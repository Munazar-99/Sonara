'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Clock } from 'lucide-react';

const daysOfWeek = [
  { id: 1, name: 'Monday', shortName: 'Mon' },
  { id: 2, name: 'Tuesday', shortName: 'Tue' },
  { id: 3, name: 'Wednesday', shortName: 'Wed' },
  { id: 4, name: 'Thursday', shortName: 'Thu' },
  { id: 5, name: 'Friday', shortName: 'Fri' },
  { id: 6, name: 'Saturday', shortName: 'Sat' },
  { id: 0, name: 'Sunday', shortName: 'Sun' },
];

const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const time = `${hour.toString().padStart(2, '0')}:${minute}`;
  return { value: time, label: time };
});

export function AvailabilitySettings() {
  const [availability, setAvailability] = useState(
    daysOfWeek.map(day => ({
      ...day,
      enabled: day.id >= 1 && day.id <= 5,
      startTime: '09:00',
      endTime: '17:00',
    })),
  );

  const handleToggleDay = (dayId: number) => {
    setAvailability(prev =>
      prev.map(day =>
        day.id === dayId ? { ...day, enabled: !day.enabled } : day,
      ),
    );
  };

  const handleTimeChange = (
    dayId: number,
    type: 'startTime' | 'endTime',
    value: string,
  ) => {
    setAvailability(prev =>
      prev.map(day => (day.id === dayId ? { ...day, [type]: value } : day)),
    );
  };

  return (
    <div>
      <Card className="overflow-hidden border-border bg-background dark:bg-zinc-800">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Working Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {availability.map(day => (
              <div
                key={day.id}
                className={`rounded-lg transition-colors ${
                  day.enabled
                    ? 'bg-zinc-50 dark:bg-zinc-900'
                    : 'bg-zinc-100/50 dark:bg-zinc-950/50'
                }`}
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <div className="flex items-center justify-between sm:w-48">
                    <Label
                      htmlFor={`${day.name}-toggle`}
                      className={`font-medium ${
                        day.enabled
                          ? 'text-foreground dark:text-zinc-100'
                          : 'text-muted-foreground dark:text-zinc-400'
                      }`}
                    >
                      {day.name}
                    </Label>
                    <Switch
                      id={`${day.name}-toggle`}
                      checked={day.enabled}
                      onCheckedChange={() => handleToggleDay(day.id)}
                      className={day.enabled ? '' : 'opacity-50'}
                    />
                  </div>

                  <div
                    className="flex flex-wrap items-center gap-2"
                    style={{ opacity: day.enabled ? 1 : 0.5 }}
                  >
                    <Select
                      value={day.startTime}
                      onValueChange={value =>
                        handleTimeChange(day.id, 'startTime', value)
                      }
                      disabled={!day.enabled}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(slot => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span
                      className={`${
                        day.enabled
                          ? 'text-muted-foreground dark:text-zinc-400'
                          : 'text-muted-foreground/50 dark:text-zinc-500'
                      }`}
                    >
                      to
                    </span>
                    <Select
                      value={day.endTime}
                      onValueChange={value =>
                        handleTimeChange(day.id, 'endTime', value)
                      }
                      disabled={!day.enabled}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="End time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(slot => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="py-1">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
