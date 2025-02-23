import { useLocalStorage } from './useLocalStorage';

interface VideoProgress {
  [videoId: string]: {
    progress: number;
    lastPosition: number;
  };
}

export function useVideoProgress(videoId: string) {
  const [progress, setProgress] = useLocalStorage<VideoProgress>('video_progress', {});

  const updateProgress = (currentTime: number, duration: number) => {
    const progressPercentage = (currentTime / duration) * 100;
    setProgress((prev: VideoProgress): VideoProgress => ({
      ...prev,
      [videoId]: {
        progress: progressPercentage,
        lastPosition: currentTime
      }
    }));
  };

  return {
    progress: progress[videoId]?.progress || 0,
    lastPosition: progress[videoId]?.lastPosition || 0,
    updateProgress
  };
}
 