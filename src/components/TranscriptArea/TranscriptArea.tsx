import { 
  Paper, 
  Typography, 
  Box, 
  IconButton, 
  Tooltip, 
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { 
  ContentCopy as CopyIcon,
  TextIncrease as TextIncreaseIcon,
  TextDecrease as TextDecreaseIcon
} from '@mui/icons-material';
import { useState } from 'react';

interface TranscriptAreaProps {
  transcript: string;
  className?: string;
}

export const TranscriptArea = ({ transcript, className }: TranscriptAreaProps) => {
  const theme = useTheme();
  const [fontSize, setFontSize] = useState(14);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
  };

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  return (
    <Paper 
      elevation={3} 
      className={`${className} transition-shadow hover:shadow-lg`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: theme.shape.borderRadius,
        p: 1.25,
      }}
    >
      <Box 
        className="p-4 flex items-center justify-between"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          mx: -1.25,
          px: 1.25,
        }}
      >
        <Typography 
          variant="h6" 
          className="font-medium"
          sx={{ 
            fontSize: '1.1rem',
            color: theme.palette.text.primary,
          }}
        >
          Transcript
        </Typography>
        <Box className="flex items-center space-x-1">
          <Tooltip title="Decrease font size">
            <IconButton 
              size="small" 
              onClick={decreaseFontSize}
              disabled={fontSize <= 12}
              className="text-gray-600 hover:text-blue-600"
            >
              <TextDecreaseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Increase font size">
            <IconButton 
              size="small" 
              onClick={increaseFontSize}
              disabled={fontSize >= 24}
              className="text-gray-600 hover:text-blue-600"
            >
              <TextIncreaseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <Tooltip title="Copy transcript">
            <IconButton 
              size="small" 
              onClick={handleCopy}
              className="text-gray-600 hover:text-blue-600"
            >
              <CopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        className="p-4"
        sx={{
          height: '100%',
          maxHeight: '400px',
          overflowY: 'auto',
          mx: -1.25,
          px: 1.25,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: '4px',
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.3),
            },
          },
        }}
      >
        {transcript ? (
          <Typography 
            variant="body2"
            sx={{ 
              fontSize: `${fontSize}px`,
              lineHeight: 1.6,
              color: theme.palette.text.primary,
              whiteSpace: 'pre-wrap',
              '& p': {
                marginBottom: theme.spacing(2),
              },
            }}
          >
            {transcript}
          </Typography>
        ) : (
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
              textAlign: 'center',
              py: 4
            }}
          >
            No transcript available for this video.
          </Typography>
        )}
      </Box>
    </Paper>
  );
}; 