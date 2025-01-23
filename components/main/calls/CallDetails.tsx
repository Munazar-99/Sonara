'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Star, Play, Pause, RotateCcw } from 'lucide-react';
import { useWavesurfer } from '@wavesurfer/react';
import { Call } from '@/features/calls/types';

export function CallDetails({ call }: { call: Call }) {
  const waveformRef = useRef<HTMLDivElement>(null);

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: waveformRef,
    url: call.recordingUrl,
    waveColor: '#94a3b8', // slate-400
    progressColor: '#3b82f6', // blue-500
    height: 50,
  });

  const togglePlayPause = () => {
    if (wavesurfer && isReady) {
      wavesurfer.playPause();
    }
  };

  const restart = () => {
    if (wavesurfer && isReady) {
      wavesurfer.seekTo(0);
      wavesurfer.play();
    }
  };

  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      {/* 
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold text-lg">{call.phoneNumber}</span>
        </div>
        <span className="text-muted-foreground">{call.time}</span>
      </div> */}

      <div className="px-6 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={restart}
                className="rounded-full hover:bg-blue-500/10 hover:text-blue-500"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="rounded-full hover:bg-blue-500/10 hover:text-blue-500"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-500/10 hover:text-blue-500"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {formatTime(currentTime)} / {call.duration}
            </div>
          </div>

          <div className="rounded-lg p-4 dark:bg-slate-900">
            <div ref={waveformRef} className="w-full" />
          </div>
        </div>
      </div>

      <div className="border-t" />

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-foreground data-[state=active]:border-primary"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="summary"
            className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-foreground data-[state=active]:border-primary"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value="transcript"
            className="rounded-none border-b-2 border-transparent px-4 py-2 hover:text-foreground data-[state=active]:border-primary"
          >
            Transcript
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1">
          <TabsContent value="overview" className="mt-0">
            <CardContent className="space-y-6 p-6">
              <div>
                <h3 className="mb-4 font-semibold">Call Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Call from
                    </span>
                    <span className="text-sm font-medium">{call.callerId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Call to
                    </span>
                    <span className="text-sm font-medium">
                      +353 (426) 041-453
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      AI Agent
                    </span>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">Lexi</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Duration
                    </span>
                    <span className="text-sm font-medium">{call.duration}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-semibold">Call Analysis</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Rating
                    </span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= 4
                              ? 'fill-primary text-primary'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Call sentiment
                    </span>
                    <Badge
                      variant="secondary"
                      className={
                        call.sentiment === 'positive'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : call.sentiment === 'neutral'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-rose-500/10 text-rose-500'
                      }
                    >
                      {call.sentiment}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      End call reason
                    </span>
                    <span className="text-sm font-medium">
                      Call ended by the caller.
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Task status
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-500/10 text-emerald-500"
                    >
                      Complete
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </motion.div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
