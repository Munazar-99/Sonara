'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

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
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="overflow-hidden border-border bg-background dark:bg-zinc-800">
        <CardHeader className="border-b border-border">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Working Hours
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div className="space-y-3" variants={containerVariants}>
            {availability.map(day => (
              <motion.div
                key={day.id}
                variants={itemVariants}
                className={`rounded-lg transition-colors ${
                  day.enabled
                    ? 'bg-zinc-50 dark:bg-zinc-900'
                    : 'bg-zinc-100/50 dark:bg-zinc-950/50'
                }`}
                style={{ originX: 0 }}
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <motion.div
                    className="flex items-center justify-between sm:w-48"
                    whileTap={{ scale: 0.98 }}
                  >
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
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Switch
                        id={`${day.name}-toggle`}
                        checked={day.enabled}
                        onCheckedChange={() => handleToggleDay(day.id)}
                        className={day.enabled ? '' : 'opacity-50'}
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap items-center gap-2"
                    animate={{
                      opacity: day.enabled ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.2 }}
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
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex justify-end"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="py-1">Save Changes</Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
