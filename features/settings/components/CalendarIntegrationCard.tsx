import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface CalendarIntegrationCardProps {
  connectedCalendars: {
    name: string;
    email: string;
    connected: boolean;
  }[];
  onConnect: (calendarName: string) => void;
  onDisconnect: (calendarName: string) => void;
}

export default function CalendarIntegrationCard({
  connectedCalendars,
  onConnect,
  onDisconnect,
}: CalendarIntegrationCardProps) {
  return (
    <Card className="hover-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle>Calendar Integration</CardTitle>
        </div>
        <CardDescription>
          Connect and manage your calendar services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {connectedCalendars.map(calendar => (
          <div
            key={calendar.name}
            className="group flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-4">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.75 5.25V18.75C21.75 19.5784 21.0784 20.25 20.25 20.25H3.75C2.92157 20.25 2.25 19.5784 2.25 18.75V5.25M21.75 5.25C21.75 4.42157 21.0784 3.75 20.25 3.75H3.75C2.92157 3.75 2.25 4.42157 2.25 5.25M21.75 5.25V9.75H2.25V5.25"
                  stroke="#4285F4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <p className="font-medium">{calendar.name}</p>
                <p className="text-sm text-muted-foreground">
                  {calendar.connected ? calendar.email : 'Disconnected'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                calendar.connected
                  ? onDisconnect(calendar.name)
                  : onConnect(calendar.name)
              }
              className={
                calendar.connected
                  ? 'text-destructive hover:bg-destructive/90 hover:text-destructive-foreground'
                  : ''
              }
            >
              {calendar.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
