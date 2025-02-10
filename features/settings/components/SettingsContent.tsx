'use client';

import { useProfileSettings } from '../hooks/useProfileSettings';
import { VoiceResponse } from 'retell-sdk/resources/voice.mjs';
import AIAgentSettingsCard from './AIAgentSettingsCard';
import CalendarIntegrationCard from './CalendarIntegrationCard';
import PersonalInformationCard from './PersonalInformationCard';
import SecurityCard from './SecurityCard';

const connectedCalendars = [
  { name: 'Google Calendar', email: 'olivia.davis@email.com', connected: true },
  { name: 'Outlook Calendar', email: '', connected: false },
  { name: 'Apple Calendar', email: '', connected: false },
];

export default function ProfileSettings({
  voices,
  user,
}: {
  voices: VoiceResponse[];
  user: { email: string; name: string };
}) {
  const {
    securityForm,
    onSecuritySubmit,
    selectedVoice,
    setSelectedVoice,
    isLoading,
  } = useProfileSettings();

  const handleConnectCalendar = (calendarName: string) => {
    console.log(`Connecting to ${calendarName}`);
    // Implement connection logic here
  };

  const handleDisconnectCalendar = (calendarName: string) => {
    console.log(`Disconnecting from ${calendarName}`);
    // Implement disconnection logic here
  };

  return (
    <div className="min-h-screen from-background to-muted/20">
      <div className="container mx-auto space-y-6 px-4 py-8 lg:px-8 lg:py-10">
        <div className="mb-8 flex items-start justify-between sm:mb-12">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Profile Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account preferences and settings
            </p>
          </div>
        </div>

        <div className="grid max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-2">
          <PersonalInformationCard name={user.name} email={user.email} />
          <SecurityCard
            form={securityForm}
            onSubmit={onSecuritySubmit}
            isLoading={isLoading}
          />
          <AIAgentSettingsCard
            voices={voices}
            selectedVoice={selectedVoice}
            onVoiceSelect={setSelectedVoice}
          />
          <CalendarIntegrationCard
            connectedCalendars={connectedCalendars}
            onConnect={handleConnectCalendar}
            onDisconnect={handleDisconnectCalendar}
          />
        </div>
      </div>
    </div>
  );
}
