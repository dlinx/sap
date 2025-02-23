import {
  Paper,
  TextField,
  Typography,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  CircularProgress
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useVideoNotes } from '../../hooks/useVideoNotes';

interface NoteAreaProps {
  videoId: string;
  videoTitle: string;
  className?: string;
}

export const NoteArea = ({ videoId, videoTitle, className }: NoteAreaProps) => {
  const theme = useTheme();
  const { notes, updateNotes } = useVideoNotes(videoId);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [saveTimeout, setSaveTimeout] = useState<number | null>(null);

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsSaved(false);
    updateNotes(event.target.value);

    // Debounce save operation
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    setIsSaving(true);
    const timeout = setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
    }, 1000);

    setSaveTimeout(timeout);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(notes);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [saveTimeout]);

  const characterCount = notes.length;
  const maxCharacters = 5000;

  return (
    <Paper
      elevation={3}
      className={`${className} transition-shadow hover:shadow-lg`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: theme.shape.borderRadius,
        p: 1.25,
      }}
    >
      <Box
        className="flex items-center justify-between"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          mx: -1.25,
          px: 1.25,
          pb: 1.25,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.1rem',
              color: theme.palette.text.primary,
              mb: 0.5,
            }}
          >
            Notes
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            {videoTitle}
          </Typography>
        </Box>
        <Box className="flex items-center space-x-1">
          {isSaving && (
            <CircularProgress
              size={20}
              thickness={4}
              sx={{ color: theme.palette.primary.main }}
            />
          )}
          {!isSaving && isSaved && (
            <CheckIcon
              fontSize="small"
              sx={{ color: theme.palette.success.main }}
            />
          )}
          <Tooltip title="Copy notes">
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <CopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          mt: 1.25,
          mx: -1.25,
          px: 1.25,
        }}
      >
        <TextField
          multiline
          fullWidth
          minRows={15}
          maxRows={20}
          value={notes}
          onChange={handleNotesChange}
          placeholder="Take your notes here..."
          variant="outlined"
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              height: '100%',
              backgroundColor: alpha(theme.palette.background.default, 0.5),
              '&:hover': {
                backgroundColor: alpha(theme.palette.background.default, 0.8),
              },
              '& textarea': {
                height: '100% !important',
              },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: alpha(theme.palette.divider, 0.8),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: characterCount >= maxCharacters
                ? theme.palette.error.main
                : theme.palette.text.secondary,
            }}
          >
            {characterCount}/{maxCharacters} characters
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}; 