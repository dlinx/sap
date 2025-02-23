import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  OpenInFull as OpenInFullIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  DeleteOutline as DeleteOutlineIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { TypingIndicator } from './TypingIndicator';
import { ChatMessage } from './ChatMessage';
import { SearchBar } from './SearchBar';
import { useChatHistory } from '../../hooks/useChatHistory';

interface ChatWindowProps {
  isMinimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
  onMaximize: () => void;
}

const ChatContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isMinimized',
})<{ isMinimized: boolean }>(({ theme, isMinimized }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  width: isMinimized ? 250 : 350,
  height: isMinimized ? 'auto' : 500,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
  overflow: 'hidden',
  boxShadow: theme.shadows[6],
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  '& form': {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  alignSelf: 'center',
  color: theme.palette.primary.main,
  transition: theme.transitions.create(['transform', 'color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    color: theme.palette.primary.dark,
    transform: 'scale(1.1)',
  },
  '&.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
}));

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isMinimized,
  onMinimize,
  onClose,
  onMaximize,
}) => {
  const {
    messages,
    isTyping,
    addMessage,
    clearHistory,
    simulateResponse,
  } = useChatHistory();
  
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [matchedMessageIds, setMatchedMessageIds] = useState<number[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<{ [key: number]: React.RefObject<HTMLDivElement> }>({});

  useEffect(() => {
    const currentMessageIds = new Set(messages.map(m => m.id));
    const oldMessageIds = Object.keys(messageRefs.current).map(Number);
    
    oldMessageIds.forEach(id => {
      if (!currentMessageIds.has(id)) {
        delete messageRefs.current[id];
      }
    });

    messages.forEach((message) => {
      if (!messageRefs.current[message.id]) {
        messageRefs.current[message.id] = React.createRef();
      }
    });
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term) {
      setMatchedMessageIds([]);
      setCurrentMatchIndex(0);
      return;
    }

    const matchedIds = messages
      .filter((message) => 
        message.text.toLowerCase().includes(term.toLowerCase())
      )
      .map((message) => message.id);

    setMatchedMessageIds(matchedIds);
    setCurrentMatchIndex(0);

    if (matchedIds.length > 0) {
      const firstMatchRef = messageRefs.current[matchedIds[0]];
      firstMatchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNavigateMatch = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentMatchIndex + 1) % matchedMessageIds.length
      : (currentMatchIndex - 1 + matchedMessageIds.length) % matchedMessageIds.length;

    setCurrentMatchIndex(newIndex);
    const matchRef = messageRefs.current[matchedMessageIds[newIndex]];
    matchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    addMessage(inputValue, true);
    setInputValue('');

    // Use default response
    await simulateResponse();
  };

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      // Reset search when opening
      setSearchTerm('');
      setMatchedMessageIds([]);
      setCurrentMatchIndex(0);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleClearHistory = () => {
    clearHistory();
    handleMenuClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <ChatContainer isMinimized={isMinimized}>
      <ChatHeader onClick={isMinimized ? onMaximize : onMinimize}>
        <Typography variant="subtitle1" component="div">
          Support Chat
        </Typography>
        <Box>
          {!isMinimized && (
            <>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearchToggle();
                }}
                sx={{ color: 'inherit', mr: 1 }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ color: 'inherit', mr: 1 }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem onClick={handleClearHistory}>
                  <DeleteOutlineIcon sx={{ mr: 1 }} />
                  Clear History
                </MenuItem>
              </Menu>
            </>
          )}
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              if (isMinimized) {
                onMaximize();
              } else {
                onMinimize();
              }
            }}
            sx={{ color: 'inherit' }}
          >
            {isMinimized ? <OpenInFullIcon /> : <MinimizeIcon />}
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            sx={{ color: 'inherit' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </ChatHeader>

      {!isMinimized && (
        <>
          {isSearchVisible && (
            <SearchBar
              onSearch={handleSearch}
              matchCount={matchedMessageIds.length}
              currentMatchIndex={currentMatchIndex}
              onNavigateMatch={handleNavigateMatch}
            />
          )}
          <MessagesContainer>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                searchTerm={searchTerm}
                isHighlighted={matchedMessageIds.includes(message.id)}
                messageRef={messageRefs.current[message.id]}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          <InputContainer>
            <form onSubmit={handleSendMessage}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                multiline
                maxRows={4}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SendButton
                        size="small"
                        disabled={!inputValue.trim()}
                        type="submit"
                        aria-label="Send message"
                      >
                        <SendIcon />
                      </SendButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </InputContainer>
        </>
      )}
    </ChatContainer>
  );
}; 