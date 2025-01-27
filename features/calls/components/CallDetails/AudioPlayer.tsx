import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Loader2, Download } from 'lucide-react';
import { useWavesurfer } from '@wavesurfer/react';
import { formatTime } from '../../utils';
import { Call } from '../../types';

interface AudioPlayerProps {
  recordingUrl: Call['recordingUrl'];
  duration: Call['duration'];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  recordingUrl,
  duration,
}) => {
  const waveformRef = React.useRef<HTMLDivElement>(null);
  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: waveformRef,
    url: recordingUrl,
    waveColor: '#94a3b8',
    progressColor: '#3b82f6',
    height: 50,
    normalize: true,
    barWidth: 2,
    barGap: 3,
    duration,
  });

  const togglePlayPause = useCallback(() => {
    if (wavesurfer && isReady) {
      wavesurfer.playPause();
    }
  }, [wavesurfer, isReady]);

  const restart = useCallback(() => {
    if (wavesurfer && isReady) {
      wavesurfer.seekTo(0);
      wavesurfer.play();
    }
  }, [wavesurfer, isReady]);

  return (
    <div className="flex-shrink-0 p-6 pt-0">
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
              {!isReady ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isPlaying ? (
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
              <a href={recordingUrl}>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(duration || 0)}
          </div>
        </div>

        <div className="rounded-lg p-4 dark:bg-slate-900">
          <div ref={waveformRef} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
