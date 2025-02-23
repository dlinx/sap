import { Routes, Route } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Box,
} from '@mui/material';
import { useThemeMode } from './hooks/useThemeMode';
import { getTheme } from './theme/theme';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ApplicationPage from './pages/ApplicationPage';
import TutorialPage from './pages/TutorialPage';
import { AppBar } from './components/AppBar/AppBar';
import { ChatSupport } from './components/ChatSupport/ChatSupport';

function App() {
  const { mode, toggleMode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar onToggleTheme={toggleMode} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/application" element={<ApplicationPage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
          </Routes>
        </Box>
        <ChatSupport />
      </Box>
    </ThemeProvider>
  );
}

export default App;