'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Play,
  Pause,
  User,
  Settings,
  Eye,
  EyeOff,
  Lock,
  Check,
} from 'lucide-react';
import Image from 'next/image';

interface Voice {
  id: string;
  name: string;
  accent: string;
  gender: string;
  age: string;
}

const voices: Voice[] = [
  {
    id: '1',
    name: 'Anthony',
    accent: 'British',
    gender: 'Male',
    age: 'Middle Aged',
  },
  { id: '2', name: 'Billy', accent: 'American', gender: 'Male', age: 'Young' },
  { id: '3', name: 'Lily', accent: 'American', gender: 'Female', age: 'Young' },
  {
    id: '4',
    name: 'Marissa',
    accent: 'American',
    gender: 'Female',
    age: 'Young',
  },
  {
    id: '5',
    name: 'Amy(UK)',
    accent: 'British',
    gender: 'Female',
    age: 'Young',
  },
  { id: '6', name: 'Bing', accent: 'American', gender: 'Male', age: 'Young' },
  {
    id: '7',
    name: 'Lucas',
    accent: 'American',
    gender: 'Male',
    age: 'Middle Aged',
  },
  {
    id: '8',
    name: 'Samad (En-In)',
    accent: 'Indian',
    gender: 'Male',
    age: 'Middle Aged',
  },
  { id: '9', name: 'Brian', accent: 'American', gender: 'Male', age: 'Young' },
  { id: '10', name: 'Jason', accent: 'American', gender: 'Male', age: 'Young' },
];

const calendarOptions = [
  {
    id: 'google',
    name: 'Google Calendar',
    logo: '/placeholder.svg?height=40&width=40',
    email: 'johndoe@gmail.com',
  },
  {
    id: 'outlook',
    name: 'Outlook Calendar',
    logo: '/placeholder.svg?height=40&width=40',
    email: 'johndoe@outlook.com',
  },
  {
    id: 'apple',
    name: 'Apple Calendar',
    logo: '/placeholder.svg?height=40&width=40',
    email: 'johndoe@icloud.com',
  },
];

export function SettingsPage() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [tempSelectedVoice, setTempSelectedVoice] = useState<Voice | null>(
    null,
  );
  const [selectedCalendar, setSelectedCalendar] = useState('google');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [accentFilter, setAccentFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState('All');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleVoiceSelect = (voice: Voice) => {
    setTempSelectedVoice(prevVoice =>
      prevVoice?.id === voice.id ? null : voice,
    );
  };

  const handleSaveVoice = () => {
    setSelectedVoice(tempSelectedVoice);
    setTempSelectedVoice(null);
  };

  const handlePlayVoice = (event: React.MouseEvent, voiceId: string) => {
    event.stopPropagation();
    if (playingVoiceId === voiceId) {
      audioRef.current?.pause();
      setPlayingVoiceId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src =
          'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        audioRef.current
          .play()
          .catch(error => console.error('Audio playback failed:', error));
        setPlayingVoiceId(voiceId);
      }
    }
  };

  const filteredVoices = voices.filter(
    voice =>
      (accentFilter === 'All' || voice.accent === accentFilter) &&
      (genderFilter === 'All' || voice.gender === genderFilter) &&
      (ageFilter === 'All' || voice.age === ageFilter),
  );

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <h1 className="mb-8 text-3xl font-bold sm:mb-12 sm:text-4xl">
          Settings
        </h1>

        <div className="space-y-12">
          {/* Account Section */}
          <section>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500">
                <User className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold sm:text-xl">
                Account Information
              </h2>
            </div>
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-0">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button className="px-6 text-sm">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Security Section */}
          <section>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-green-500 to-emerald-500">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold sm:text-xl">Security</h2>
            </div>
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="p-0">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="current-password"
                      className="text-sm font-medium"
                    >
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showOldPassword ? 'text' : 'password'}
                        className="h-11 pr-12"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="new-password"
                      className="text-sm font-medium"
                    >
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        className="h-11 pr-12"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="confirm-password"
                      className="text-sm font-medium"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="h-11 pr-12"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button className="px-6 text-sm">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* AI Agent Settings Section */}
          <section>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-500">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold sm:text-xl">
                AI Agent Settings
              </h2>
            </div>
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent className="space-y-8 p-0">
                {/* Voice Selection */}
                <div>
                  <h3 className="mb-4 text-sm font-medium">Voice</h3>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="mb-1 font-medium">
                        {selectedVoice
                          ? selectedVoice.name
                          : 'No voice selected'}
                      </h3>
                      {selectedVoice && (
                        <p className="text-sm text-muted-foreground">
                          {selectedVoice.accent} • {selectedVoice.gender} •{' '}
                          {selectedVoice.age}
                        </p>
                      )}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Change Voice
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95vw] max-w-[550px] p-0">
                        <DialogHeader className="border-b px-6 py-4">
                          <DialogTitle className="text-xl">
                            Select a Voice
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 border-b px-6 py-4">
                          <div className="flex flex-col gap-4 sm:flex-row">
                            <Select
                              value={accentFilter}
                              onValueChange={setAccentFilter}
                            >
                              <SelectTrigger className="w-full sm:w-[150px]">
                                <SelectValue placeholder="Accent" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="All">All Accents</SelectItem>
                                <SelectItem value="American">
                                  American
                                </SelectItem>
                                <SelectItem value="British">British</SelectItem>
                                <SelectItem value="Indian">Indian</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select
                              value={genderFilter}
                              onValueChange={setGenderFilter}
                            >
                              <SelectTrigger className="w-full sm:w-[150px]">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="All">All Genders</SelectItem>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select
                              value={ageFilter}
                              onValueChange={setAgeFilter}
                            >
                              <SelectTrigger className="w-full sm:w-[150px]">
                                <SelectValue placeholder="Age" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="All">All Ages</SelectItem>
                                <SelectItem value="Young">Young</SelectItem>
                                <SelectItem value="Middle Aged">
                                  Middle Aged
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <ScrollArea className="max-h-[400px] overflow-auto">
                          <div className="px-6 py-2">
                            {filteredVoices.map(voice => (
                              <div
                                key={voice.id}
                                className={`flex cursor-pointer items-center justify-between py-3 transition-colors ${
                                  tempSelectedVoice?.id === voice.id
                                    ? 'bg-muted'
                                    : 'hover:bg-muted/50'
                                }`}
                                onClick={() => handleVoiceSelect(voice)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                                      tempSelectedVoice?.id === voice.id
                                        ? 'border-primary bg-primary'
                                        : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                  >
                                    {tempSelectedVoice?.id === voice.id && (
                                      <Check className="h-3 w-3 text-white" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium">{voice.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {voice.accent} • {voice.gender} •{' '}
                                      {voice.age}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-50 hover:opacity-100"
                                  onClick={e => handlePlayVoice(e, voice.id)}
                                >
                                  {playingVoiceId === voice.id ? (
                                    <Pause className="h-4 w-4" />
                                  ) : (
                                    <Play className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        <div className="flex justify-end border-t px-6 py-4">
                          <Button
                            onClick={handleSaveVoice}
                            disabled={!tempSelectedVoice}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Calendar Selection */}
                <div>
                  <h3 className="mb-4 text-sm font-medium">Calendar</h3>
                  <RadioGroup
                    value={selectedCalendar}
                    onValueChange={setSelectedCalendar}
                  >
                    <div className="space-y-4">
                      {calendarOptions.map(calendar => (
                        <div
                          key={calendar.id}
                          className={`flex items-center justify-between rounded-lg border p-4 ${
                            selectedCalendar === calendar.id
                              ? 'border-primary bg-muted/50'
                              : ''
                          } ${selectedCalendar && selectedCalendar !== calendar.id ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-center gap-4">
                            <RadioGroupItem
                              value={calendar.id}
                              id={calendar.id}
                              className="mt-0"
                              disabled={
                                !!selectedCalendar &&
                                selectedCalendar !== calendar.id
                              }
                            />
                            <div className="relative h-10 w-10">
                              <Image
                                src={calendar.logo}
                                alt={calendar.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <Label
                              htmlFor={calendar.id}
                              className="cursor-pointer font-medium"
                            >
                              {calendar.name}
                            </Label>
                          </div>
                          {selectedCalendar === calendar.id ? (
                            <div className="text-right">
                              <Button
                                variant="secondary"
                                size="sm"
                                className="mb-1"
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Connected
                              </Button>
                              <p className="text-xs text-muted-foreground">
                                {calendar.email}
                              </p>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={
                                !!selectedCalendar &&
                                selectedCalendar !== calendar.id
                              }
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
