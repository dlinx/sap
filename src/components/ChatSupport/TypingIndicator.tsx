import React from 'react';
import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: translateY(0);
    opacity: 0.6;
  }
  40% { 
    transform: translateY(-5px);
    opacity: 1;
  }
`;

const TypingDot = styled('span')(({ theme }) => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.grey[400] 
    : theme.palette.grey[600],
  margin: '0 2px',
  animation: `${bounce} 1.4s infinite ease-in-out both`,
  transition: theme.transitions.create('background-color'),
  '&:nth-of-type(1)': {
    animationDelay: '-0.32s',
  },
  '&:nth-of-type(2)': {
    animationDelay: '-0.16s',
  },
}));

const IndicatorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  maxWidth: 'fit-content',
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.grey[800] 
    : theme.palette.grey[100],
  borderRadius: theme.spacing(2, 2, 2, 0),
  transition: theme.transitions.create(['background-color', 'transform']),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[700] 
      : theme.palette.grey[200],
    transform: 'scale(1.01)',
  },
}));

export const TypingIndicator: React.FC = () => {
  return (
    <IndicatorContainer>
      <TypingDot />
      <TypingDot />
      <TypingDot />
    </IndicatorContainer>
  );
}; 