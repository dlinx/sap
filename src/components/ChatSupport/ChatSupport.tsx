import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { ChatWindow } from './ChatWindow';
import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 1000,
}));

export const ChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <Box>
      {!isOpen && (
        <StyledFab
          color="primary"
          aria-label="chat support"
          onClick={handleToggleChat}
        >
          <ChatIcon />
        </StyledFab>
      )}
      {isOpen && (
        <ChatWindow
          isMinimized={isMinimized}
          onMinimize={handleMinimize}
          onClose={handleClose}
          onMaximize={() => setIsMinimized(false)}
        />
      )}
    </Box>
  );
}; 