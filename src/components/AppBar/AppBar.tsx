import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  marginRight: theme.spacing(3),
  '&:hover': {
    textDecoration: 'underline',
  },
}));

interface AppBarProps {
  onToggleTheme: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({ onToggleTheme }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <StyledLink to="/">College Portal</StyledLink>
        </Typography>
        
        <Box className="flex items-center space-x-4">
          <StyledLink to="/tutorial">Tutorials</StyledLink>
          <IconButton
            color="inherit"
            onClick={onToggleTheme}
            size="large"
            aria-label="toggle theme"
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}; 