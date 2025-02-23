import { LinearProgress, Box, Typography } from '@mui/material';

interface ProgressTrackerProps {
  progress: number;
  className?: string;
}

export const ProgressTracker = ({ progress, className }: ProgressTrackerProps) => {
  return (
    <Box className={`p-4 ${className}`}>
      <Typography variant="body2" className="mb-1">
        Progress: {Math.round(progress)}%
      </Typography>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{
          height: 8,
          borderRadius: 4,
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          },
        }}
      />
    </Box>
  );
}; 