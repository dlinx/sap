import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  searchTerm?: string;
  isHighlighted?: boolean;
  messageRef?: React.RefObject<HTMLDivElement>;
}

const MessageContainer = styled(Box, {
  shouldForwardProp: (prop) => !['isUser', 'isHighlighted'].includes(prop as string),
})<{ isUser: boolean; isHighlighted?: boolean }>(({ theme, isUser, isHighlighted }) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  marginBottom: theme.spacing(1),
  width: '100%',
  backgroundColor: isHighlighted ? (
    theme.palette.mode === 'dark' 
      ? theme.palette.grey[800] 
      : theme.palette.grey[200]
  ) : 'transparent',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MessageContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ isUser }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: isUser ? 'flex-end' : 'flex-start',
  maxWidth: '80%',
}));

const MessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  padding: theme.spacing(1.5, 2),
  display: 'inline-block',
  maxWidth: '100%',
  backgroundColor: isUser 
    ? theme.palette.primary.main 
    : theme.palette.mode === 'dark' 
      ? theme.palette.grey[800] 
      : theme.palette.grey[100],
  color: isUser 
    ? theme.palette.primary.contrastText 
    : theme.palette.text.primary,
  borderRadius: isUser 
    ? theme.spacing(2, 2, 0, 2) 
    : theme.spacing(2, 2, 2, 0),
  wordBreak: 'break-word',
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    transform: 'scale(1.01)',
    backgroundColor: isUser 
      ? theme.palette.primary.dark 
      : theme.palette.mode === 'dark' 
        ? theme.palette.grey[700] 
        : theme.palette.grey[200],
  },
  boxShadow: theme.shadows[1],
  '& .markdown-content': {
    '& > *:first-child': {
      marginTop: 0,
    },
    '& > *:last-child': {
      marginBottom: 0,
    },
    '& p': {
      margin: theme.spacing(0.5, 0),
    },
    '& a': {
      color: isUser 
        ? theme.palette.primary.contrastText 
        : theme.palette.primary.main,
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    '& ul, & ol': {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(2.5),
    },
    '& li': {
      margin: theme.spacing(0.25, 0),
    },
    '& blockquote': {
      margin: theme.spacing(1, 0),
      padding: theme.spacing(0.5, 1),
      borderLeft: `3px solid ${
        isUser 
          ? theme.palette.primary.contrastText 
          : theme.palette.primary.main
      }`,
      opacity: 0.8,
    },
  },
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.mode === 'dark' 
    ? theme.palette.grey[500] 
    : theme.palette.grey[600],
  marginTop: theme.spacing(0.5),
  transition: theme.transitions.create('color'),
  '&:hover': {
    color: theme.palette.mode === 'dark' 
      ? theme.palette.grey[400] 
      : theme.palette.grey[700],
  },
}));

const HighlightedText = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark'
    ? theme.palette.warning.dark
    : theme.palette.warning.light,
  padding: '0 2px',
  borderRadius: 2,
}));

const MarkdownWrapper = styled('div')({
  '&.markdown-content': {
    width: '100%',
  },
});

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  searchTerm = '',
  isHighlighted = false,
  messageRef,
}) => {
  const highlightText = (text: string, term: string) => {
    if (!term) return text;

    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === term.toLowerCase() ? (
        <HighlightedText key={i}>{part}</HighlightedText>
      ) : (
        part
      )
    );
  };

  const markdownComponents: Components = {
    // ... existing code ...
  };

  const renderMarkdown = (text: string) => {
    if (!searchTerm) {
      return (
        <MarkdownWrapper className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {text}
          </ReactMarkdown>
        </MarkdownWrapper>
      );
    }

    // If there's a search term, render without markdown to highlight the search term
    return highlightText(text, searchTerm);
  };

  return (
    <MessageContainer 
      isUser={message.isUser} 
      isHighlighted={isHighlighted}
      ref={messageRef}
    >
      <MessageContent isUser={message.isUser}>
        <MessageBubble isUser={message.isUser}>
          {renderMarkdown(message.text)}
        </MessageBubble>
        <TimeStamp>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </TimeStamp>
      </MessageContent>
    </MessageContainer>
  );
}; 