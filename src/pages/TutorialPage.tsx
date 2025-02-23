import { Box, Container, Grid } from '@mui/material';
import { VideoPlayer } from '../components/VideoPlayer/VideoPlayer';
import { NoteArea } from '../components/NoteArea/NoteArea';
import { TranscriptArea } from '../components/TranscriptArea/TranscriptArea';
import { ProgressTracker } from '../components/ProgressTracker/ProgressTracker';
import { useVideoProgress } from '../hooks/useVideoProgress';

// This would typically come from an API or props
const DUMMY_VIDEO = {
  id: 'big-buck-bunny',
  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  title: 'Big Buck Bunny',
  transcript: `Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. 
    When one sunny day three rodents rudely harass him, something snaps... 
    and the rabbit ain't no bunny anymore! In the typical cartoon tradition 
    he prepares the nasty rodents a comical revenge.`,
};

const TutorialPage = () => {
  const { progress, lastPosition, updateProgress } = useVideoProgress(DUMMY_VIDEO.id);

  const handleVideoProgress = (currentTime: number, duration: number) => {
    updateProgress(currentTime, duration);
  };

  return (
    <Container maxWidth="xl" className="py-8">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box className="space-y-4">
            <VideoPlayer
              src={DUMMY_VIDEO.src}
              title={DUMMY_VIDEO.title}
              onTimeUpdate={handleVideoProgress}
              initialTime={lastPosition}
            />
            <ProgressTracker progress={progress} />
            <TranscriptArea
              transcript={DUMMY_VIDEO.transcript}
              currentTime={lastPosition}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <NoteArea
            videoId={DUMMY_VIDEO.id}
            videoTitle={DUMMY_VIDEO.title}
            className="sticky top-4"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TutorialPage;
