import { useLocalStorage } from './useLocalStorage';

interface VideoNotes {
  [videoId: string]: string;
}

export function useVideoNotes(videoId: string) {
  const [notes, setNotes] = useLocalStorage<VideoNotes>('video_notes', {});

  const updateNotes = (newNotes: string) => {
    setNotes((prev: VideoNotes): VideoNotes => ({
      ...prev,
      [videoId]: newNotes
    }));
  };

  return {
    notes: notes[videoId] || '',
    updateNotes
  };
} 