'use client';

import { useState, useMemo } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, MapPin, Globe, Search, Filter } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnimatePresence, motion } from 'motion/react';

interface Booking {
  id: number;
  title: string;
  duration: string;
  location: string;
  timezone: string;
  date: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
  type: string;
  agent: {
    name: string;
    avatar: string;
  };
}

const generateBookings = (date: Date): Booking[] => {
  const bookings: Booking[] = [];
  const types = ['Property Viewing', 'Consultation', 'Follow-up', 'Assessment'];
  const statuses: ('confirmed' | 'pending' | 'cancelled')[] = [
    'confirmed',
    'pending',
    'cancelled',
  ];
  const locations = [
    'Pine Realty Office',
    'Client Location',
    'Virtual Meeting',
  ];

  const numBookings = Math.floor(Math.random() * 5) + 1;

  for (let i = 0; i < numBookings; i++) {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 4) * 15;
    const bookingDate = new Date(date);
    bookingDate.setHours(hours, minutes);

    bookings.push({
      id: Math.random(),
      title: types[Math.floor(Math.random() * types.length)],
      duration: `${Math.floor(Math.random() * 2) + 1}h`,
      location: locations[Math.floor(Math.random() * locations.length)],
      timezone: 'Australia/Sydney',
      date: bookingDate,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: types[Math.floor(Math.random() * types.length)],
      agent: {
        name: ['Oliver Wilson', 'Emma Thompson', 'James Chen'][
          Math.floor(Math.random() * 3)
        ],
        avatar: '/placeholder.svg?height=32&width=32',
      },
    });
  }

  return bookings;
};

const allBookings = eachDayOfInterval({
  start: new Date(2024, 11, 1),
  end: new Date(2024, 11, 31),
}).flatMap(date => generateBookings(date));

export function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11));
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(2024, 11, 1),
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredBookings = useMemo(() => {
    return allBookings.filter(booking => {
      const matchesSearch =
        booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.agent.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || booking.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
  const prevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'cancelled':
        return 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-[1fr,380px]">
      <Card className="border-border bg-background dark:bg-zinc-800">
        <CardHeader className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                ←
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                →
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Property Viewing">
                  Property Viewing
                </SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Assessment">Assessment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px text-sm">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div
                key={day}
                className="flex h-8 items-center justify-center font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
            {days.map((day, dayIdx) => {
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const dayBookings = filteredBookings.filter(booking =>
                isSameDay(booking.date, day),
              );
              const hasBookings = dayBookings.length > 0;

              return (
                <motion.button
                  key={day.toString()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(day)}
                  className={`relative flex h-16 flex-col items-center justify-start rounded-lg border-2 p-1 transition-colors sm:h-24 sm:p-2 ${
                    !isCurrentMonth
                      ? 'bg-muted/5 text-muted-foreground/50'
                      : isSelected
                        ? 'border-primary bg-primary/5 text-primary'
                        : hasBookings
                          ? 'border-primary/20 hover:border-primary/40'
                          : 'border-transparent hover:border-border'
                  }`}
                  style={{
                    gridColumnStart: dayIdx === 0 ? day.getDay() + 1 : 'auto',
                  }}
                >
                  <time
                    dateTime={format(day, 'yyyy-MM-dd')}
                    className="text-xs font-medium sm:text-sm"
                  >
                    {format(day, 'd')}
                  </time>
                  {hasBookings && (
                    <div className="mt-1 w-full space-y-1">
                      {dayBookings.slice(0, 3).map(booking => (
                        <div
                          key={booking.id}
                          className={`h-1 w-full rounded-full sm:h-1.5 ${
                            booking.status === 'confirmed'
                              ? 'bg-emerald-500/50'
                              : booking.status === 'pending'
                                ? 'bg-yellow-500/50'
                                : 'bg-rose-500/50'
                          }`}
                        />
                      ))}
                      {dayBookings.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{dayBookings.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit border-border bg-background dark:bg-zinc-800">
        <CardHeader>
          <h3 className="font-semibold tracking-tight">
            {selectedDate
              ? format(selectedDate, 'MMMM d, yyyy')
              : 'Select a date'}
          </h3>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4 sm:h-[600px]">
            <AnimatePresence mode="wait">
              {filteredBookings.filter(
                booking =>
                  selectedDate && isSameDay(booking.date, selectedDate),
              ).length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {filteredBookings
                    .filter(
                      booking =>
                        selectedDate && isSameDay(booking.date, selectedDate),
                    )
                    .map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg bg-zinc-50 p-4 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
                      >
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage
                              src={booking.agent.avatar}
                              alt={booking.agent.name}
                            />
                            <AvatarFallback>
                              {booking.agent.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="truncate font-medium">
                                  {booking.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {booking.agent.name}
                                </p>
                              </div>
                              <Badge
                                variant="secondary"
                                className={getStatusColor(booking.status)}
                              >
                                {booking.status}
                              </Badge>
                            </div>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                {booking.duration}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-2 h-4 w-4" />
                                {booking.location}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Globe className="mr-2 h-4 w-4" />
                                {booking.timezone}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center"
                >
                  <p className="text-muted-foreground">
                    No bookings found for this date
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
