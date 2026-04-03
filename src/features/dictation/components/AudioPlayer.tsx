'use client';

import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  audioUrl: string;
  currentStartTime: number;
  currentEndTime: number;
}

export function AudioPlayer({
  audioUrl,
  currentStartTime,
  currentEndTime,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const startTime = Number(currentStartTime) || 0;
  const endTime = Number(currentEndTime) || 0;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
    }
  }, [startTime]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= endTime) {
        audio.pause();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [endTime]);

  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted px-5 py-3">
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      <Button size="icon" onClick={handlePlay} aria-label="Play">
        ▶
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handlePause}
        aria-label="Pause"
      >
        ⏸
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleReplay}
        aria-label="Replay"
      >
        🔁
      </Button>

      <span className="ml-auto text-xs text-muted-foreground">
        {startTime.toFixed(1)}s - {endTime.toFixed(1)}s
      </span>
    </div>
  );
}
