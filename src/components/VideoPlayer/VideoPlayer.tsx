import { Box, Paper } from '@mui/material';
import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  title: string;
  initialTime?: number;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  className?: string;
}

export const VideoPlayer = ({ src, title, initialTime = 0, onTimeUpdate, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (onTimeUpdate) {
        onTimeUpdate(video.currentTime, video.duration);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [onTimeUpdate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !initialTime) return;

    // Set initial playback position
    video.currentTime = initialTime;
  }, [initialTime]);

  return (
    <Paper elevation={3} className={className}>
      <Box className="aspect-video w-full">
        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          title={title}
          style={{width:'100%'}}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Paper>
  );
}; 